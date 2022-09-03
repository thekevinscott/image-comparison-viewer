import { html, css, LitElement, PropertyValueMap } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';
import { Background } from './background';
import './background';
import './mask';
import './images';
import './handle';
import { InteractiveLitElement } from '../controllers/interaction-controller';
import { DraggerChangeEvent } from './handle';

export class ImageComparisonViewer extends LitElement {
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
  private mouse: InteractiveLitElement = new InteractiveLitElement(this);

  @property()
  background: Background = 'striped';

  @property({ type: Boolean })
  showHandle = false;

  @property({ type: Number })
  zoom = 1

  @state()
  comparisonx = .5

  @state()
  images: HTMLImageElement[] | undefined;

  @query('#slot')
  mainSlot?: HTMLSlotElement;

  getChildNodes(): Array<HTMLImageElement> {
    return this.mainSlot?.assignedNodes({ flatten: true }).filter(el => (<Element>el).tagName === 'IMG') as HTMLImageElement[] || [];
  }

  observer: MutationObserver;

  constructor() {
    super();
    const requestUpdate = () => this.requestUpdate();
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          requestUpdate();
        }
      });
    });
  }

  handleSlotchange() {
    const requestUpdate = () => this.requestUpdate();
    const childNodes = this.getChildNodes();
    if (childNodes.length > 2) {
      console.warn('Only two images are supported')
    } else {
      this.images = childNodes;
      this.observer.disconnect();
      requestUpdate();

      this.images.forEach(image => {
        this.observer.observe(image, {
          attributes: true,
        });
      })
    }
  }

  getImageTransform() {
    const { zoom, mouse } = this;
    const x = mouse.x / zoom;
    const y = mouse.y / zoom;
    return `scale(${zoom}) translate(calc(${x}px), calc(${y}px))`;
  }

  renderImage(img?: HTMLImageElement) {
    if (img) {
      const transform = this.getImageTransform();
      const style = styleMap({
        transform,
      });
      return html`<img style=${style} src="${img.src}" />`;
    }

    return null;
  }

  handleDrag = ({ detail }: DraggerChangeEvent) => {
    this.comparisonx = detail.x;
    // console.log('handled', this.comparisonx);
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

  protected willUpdate(): void {
    this.setHandlePosition();
  }

  // protected updated(): void {
  //   console.log('viewer update')
  // }

  @state()
  handlePosition = {}

  setHandlePosition = () => {
    const { images, zoom, mouse } = this;
    const image = images?.[0] || images?.[1];
    if (image) {
      const imageSize = { width: image.width, height: image.height };
      const { height, width } = this.getRect();
      const y = mouse.y / zoom;
      const x = mouse.x / zoom;
      const top = ((height / 2) - (imageSize.height / 2 * zoom) - 2 + (y * zoom));
      const left = ((width / 2) - (imageSize.width / 2 * zoom) + (x * zoom) + 0);
      // this.comparisonx = left / width;
      // console.log('new', this.comparisonx)
      // console.log('left', left, 'width', width, 'comparisonX', this.comparisonx);
      this.handlePosition = {
        left: `${left}px`,
        top: `${top}px`,
        height: `${imageSize.height * zoom}px`,
        width: `${imageSize.width * zoom}px`,
        // transform: `scale(${zoom}`,
      };
    }
  }

  render() {
    const { showHandle, background, comparisonx, zoom, mouse } = this;
    return html`
      ${showHandle && html`
      <div id="handle-container" style=${styleMap(this.handlePosition)}>
        <image-comparison-viewer-dragger-handle zoom=${zoom} initialValue=${comparisonx} @dragger-change-event=${this.handleDrag}></image-comparison-viewer-dragger-handle>
      </div>
      `}
      <slot name="background">
        <image-comparison-viewer-background background=${background}></image-comparison-viewer-background>
      </slot>
      <image-comparison-viewer-images>
        <slot id="slot" @slotchange=${this.handleSlotchange}></slot>
        <div class="center-container">
         ${this.renderImage(this.images?.[0])}
         </div>
         <div class="center-container">
         <image-comparison-viewer-mask comparisonX=${comparisonx} width=${this.images?.[1].width} height=${this.images?.[1].height} zoom=${zoom} x=${mouse.x} y=${mouse.y}>
          <img src="${this.images?.[1].src}" />
         </image-comparison-viewer-mask>
         </div>
      </image-comparison-viewer-images>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer': ImageComparisonViewer
  }
}

customElements.get('image-comparison-viewer') || customElements.define('image-comparison-viewer', ImageComparisonViewer);
