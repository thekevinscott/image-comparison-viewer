import { html, css, PropertyValueMap } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { Background } from './background';
import './background';
import './mask';
import './images';
import Hammer from 'hammerjs';
import './handle';
import { InteractiveElement } from '../mixins/interactiveElement';
import { DraggerChangeEvent } from './handle';

type ImageElement = HTMLImageElement | HTMLCanvasElement;
type ImageSize = [number, number];
type ValidChildNodes = [ImageElement, ImageElement];

const isValidChildNodes = (nodes?: unknown): nodes is ValidChildNodes => {
  return !!nodes && Array.isArray(nodes) && nodes.filter(isImageElement).length === 2;
};

const isImageElement = (el?: unknown): el is ImageElement => {
  if (!el || typeof el !== 'object' || !('innerHTML' in el)) {
    return false;
  }

  return [
    'IMG',
    'CANVAS',
  ].includes((<Element>el).tagName);
}

export class ImageComparisonViewer extends InteractiveElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      height: 100%;
      transform-origin: center;
      touch-action: manipulation;
      cursor: grab;
    }

    ::slotted(img) {
      display: none;
    }

    img {
      display: block;
      user-drag: none;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    .center-container {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #handle-container {
      position: absolute;
      top: 0;
      left: 0;
    }
  `

  @property()
  background: Background = 'striped';

  @property({ type: Number })
  zoom = 1

  @state()
  startingZoom = 1

  @state()
  comparisonx = .5

  @state()
  imageSize?: ImageSize;

  @query('#slot')
  mainSlot?: HTMLSlotElement;

  imageElements?: ValidChildNodes;

  getChildNodes(): Array<ImageElement> {
    return this.mainSlot?.assignedNodes({
      flatten: true,
    }).filter(isImageElement) as ImageElement[] || [];
  }

  observer?: MutationObserver;

  @state()
  isPinching = true;

  imageAContainer: Ref<HTMLDivElement> = createRef();
  imageBContainer: Ref<HTMLDivElement> = createRef();

  connectedCallback() {
    super.connectedCallback();
    this.setupListeners(this);
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          this.renderImages();
        }
      });
    });

    const mc = new Hammer.Manager(this);
    mc.add(new Hammer.Pinch({ threshold: 0 }));


    mc.on('pinchstart', () => {
      this.isPinching = true;
      this.canMove = false;
      this.startingZoom = this.zoom;
    });
    mc.on('pinchend', () => {
      this.isPinching = false;
      this.canMove = true;
      this.startingZoom = this.zoom;
    });

    mc.on('pinch', (e) => {
      this.zoom = e.scale * this.startingZoom;
    });
  }

  renderImages() {
    const childNodes = this.imageElements;
    if (isValidChildNodes(childNodes)) {
      this.imageSize = undefined;
      this.observer?.disconnect();

      childNodes.forEach(image => {
        this.observer?.observe(image, {
          attributes: true,
        });
      });

      // clear out existing content
      const imageAContainer = this.imageAContainer.value!;
      imageAContainer.innerHTML = '';
      const imageBContainer = this.imageBContainer.value!;
      imageBContainer.innerHTML = '';

      const imageA = childNodes[0];
      const imageB = childNodes[1];

      imageAContainer.appendChild(childNodes[0]);
      imageBContainer.appendChild(childNodes[1]);
      const imageSizeA: ImageSize = [imageA.width, imageA.height];
      const imageSizeB: ImageSize = [imageB.width, imageB.height];
      if (imageSizeA[0] !== imageSizeB[0] || imageSizeA[1] !== imageSizeB[1]) {
        throw new Error([
          `Images do not match in size.`,
          `First image: ${JSON.stringify(imageSizeA)}`,
          `Second image: ${JSON.stringify(imageSizeB)}`,
        ].join(' '));
      }
      this.imageSize = imageSizeA;
      this.updateImageAStyle();
    }
  }

  handleSlotchange() {
    const childNodes = this.getChildNodes();
    if (childNodes.length === 2) {
      this.imageElements = childNodes as [ImageElement, ImageElement];
      this.renderImages();
    }
  }

  updateImageAStyle() {
    const imageA = this.imageAContainer.value?.children[0];
    if (isImageElement(imageA)) {
      const x = this.x / this.zoom;
      const y = this.y / this.zoom;
      const transform = `scale(${this.zoom}) translate(calc(${x}px), calc(${y}px))`;
      imageA.style.transform = transform;
    }
  }

  firstUpdated() {
    this.updateImageAStyle();
  }

  updated(_p: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    if (_p.has('x') || _p.has('y') || _p.has('active') || _p.has('comparisonx') || _p.has('zoom')) {
      this.updateImageAStyle();
    }
  }

  handleDrag = ({ detail }: DraggerChangeEvent) => {
    this.comparisonx = detail.x;
    this.requestUpdate();
  }

  getRect(): DOMRect {
    let parent = this.parentElement as HTMLElement;
    if (parent === null) {
      parent = (this.getRootNode() as any)?.host;
    }
    if (parent === null) {
      throw new Error('Parent of drag handle is null');
    }
    return parent.getBoundingClientRect();
  }

  render() {
    const { imageSize, background, comparisonx, zoom, x, y, } = this;
    return html`
      <slot name="background">
        <image-comparison-viewer-background background=${background}></image-comparison-viewer-background>
      </slot>
      <image-comparison-viewer-images>
        <slot id="slot" @slotchange=${this.handleSlotchange}></slot>
        <div class="center-container" ${ref(this.imageAContainer)}>
        </div>
        <div class="center-container">
          <image-comparison-viewer-mask
            comparisonX=${comparisonx}
            width="${imageSize?.[0]}"
            height="${imageSize?.[1]}"
            zoom=${zoom}
            x=${x}
            y=${y}
            ${ref(this.imageBContainer)}
          >
          </image-comparison-viewer-mask>
        </div>
      </image-comparison-viewer-images>
      ${imageSize && html`
        <div class="center-container">
          <image-comparison-viewer-dragger-handle
            zoom=${zoom}
            initialValue=${comparisonx}
            @dragger-change-event=${this.handleDrag}
            .imageSize=${imageSize}
            .position=${[ x, y ]}
          >
          </image-comparison-viewer-dragger-handle>
        </div>
      `}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer': ImageComparisonViewer
  }
}

customElements.get('image-comparison-viewer') || customElements.define('image-comparison-viewer', ImageComparisonViewer);
