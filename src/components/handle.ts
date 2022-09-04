import { html, css, PropertyValueMap } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {createRef, Ref, ref} from 'lit/directives/ref.js';
import { InteractiveElement } from '../mixins/interactiveElement';

type DraggerChangeEventDetail = {
  x: number;
}

export class DraggerChangeEvent extends Event {
  detail: DraggerChangeEventDetail;

  constructor(x: number) {
    super('dragger-change-event', {
      bubbles: true,
      cancelable: true,
    });

    this.detail = {
      x,
    }
  }
}

type Position = [number, number];

type GetContainerStyle = (props: {
  imageSize: Position;
  zoom: number;
  position: Position;
}) => Record<string, string>;
const getContainerStyle: GetContainerStyle = ({
  imageSize: [imageSizeWidth, imageSizeHeight],
  position: [positionX, positionY],
  zoom,
}) => {
  // const { height, width } = this.getRect();
  // const y = this.y / zoom;
  // const x = this.x / zoom;
  // const top = ((height / 2) - (imageSize.height / 2 * zoom) - 2 + (y * zoom));
  // const left = ((width / 2) - (imageSize.width / 2 * zoom) + (x * zoom) + 0);
  // // this.comparisonx = left / width;
  // // console.log('new', this.comparisonx)
  // // console.log('left', left, 'width', width, 'comparisonX', this.comparisonx);
  const x = positionX;
  const y = positionY;
  // return `scale(${this.zoom}) translate(calc(${x}px), calc(${y}px))`;
  return {
    transform: `translate(calc(${x}px), calc(${y}px))`,
    height: `${imageSizeHeight * zoom}px`,
    width: `${imageSizeWidth * zoom}px`,
    // transform: `scale(${zoom}`,
  };
}

export class ImageComparisonViewerDraggerHandle extends InteractiveElement {
  static styles = css`
    #container {
      position: relative;
      z-index: 2;
    }
    #handle {
      margin: 0;
      padding: 0;
      height: 100%;
      position: absolute;
      z-index: 2;
      width: 40px;
      height: 100%;
      position: absolute;
      margin-left: calc(-40px / 2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: grab;
    }

    #handle:hover #handle-bar,
    #handle.active #handle-bar {
      border: 1px solid #006aa0;
      background: #0284c7;
      width: 4px;
    }

    #handle-bar {
      transition-duration: 0.1s;
      background: white;
      border: 1px solid #043C5E;
      width: 4px;
      height: calc(100% - 10px);
    }

    .handle-dot {
      border: 1px solid #DF3373;
      background:  #FB5895;
      transition-duration: 0.1s;
      border-radius: 50%;
      border: 1px solid #043C5E;
      width: 10px;
      height: 10px;
      background: white;
      position: absolute;
      top: -5px;
      left: 50%;
      margin-left: -6px;
    }

    .handle-dot.bottom {
      top: calc(100% - 5px);
    }

    #handle.small > .handle-dot {
      width: 5px;
      height: 5px;
      top: -2.5px;
      margin-left: -3px;
    }
    #handle.small > .handle-dot.bottom {
      top: calc(100% - 2.5px);
    }

    #handle.small > #handle-bar {
      width: 2px;
      height: calc(100% - 5px);
    }
  `

  constructor() {
    super();
    this.preventDefault = true;
  }

  protected firstUpdated(): void {
    this.setupListeners(this.draggerRef.value!);
    this.comparisonx = this.initialValue;
    const width = this.getWidth();
    this.x = this.comparisonx * width;
  }

  draggerRef: Ref<HTMLDivElement> = createRef();

  @property({ type: Object })
  imageSize?: Position = [0, 0];

  @property({ type: Object })
  position: Position = [0, 0];

  @property({ type: Number })
  initialValue = 0.5;

  @property({ type: Number })
  zoom = 1;

  @state()
  x = 0;

  @state()
  comparisonx: number = 0.5;

  @state()
  width = 0;

  @query('#container')
  containerEl?: HTMLDivElement;

  getWidth() {
    return this.containerEl?.getBoundingClientRect().width || 0;
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const { x, comparisonx } = this;
    if (_changedProperties.has('x')) {
      const width = this.getWidth();
      if (width > 10) {
        this.comparisonx = getX(x, width) / width;
      }
    }
    if (_changedProperties.has('zoom')) {
      const width = this.getWidth();
      this.x = this.comparisonx * width;
    }
    if (_changedProperties.has('comparisonx') && comparisonx !== _changedProperties.get('comparisonx')) {
      this.dispatchEvent(new DraggerChangeEvent(this.comparisonx));
    }
  }

  render() {
    const { comparisonx, active, imageSize, draggerRef, zoom, position } = this;
    if (!imageSize) {
      return null;
    }

    const width = this.getWidth();

    const handleX = comparisonx * width;

    const small = width < 100;

    return html`
      <div id="container" style=${styleMap(getContainerStyle({ imageSize, zoom, position }))}>
        <div
          id="handle"
          ${ref(draggerRef)}
          class=${classMap({
            active,
            small,
          })}
          style=${styleMap({
            transform: `translate(${handleX}px, 0)`,
          })}
        >
          <div class="handle-dot top"></div>
          <div id="handle-bar"></div>
          <div class="handle-dot bottom"></div>
        </div>
      </div>
    `;
  }
}

const getX = (x: number, width: number) => {
  if (x < 0) {
    return 0;
  }

  if (x > width) {
    return width;
  }

  return x;
}

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer-dragger-handle': ImageComparisonViewerDraggerHandle
  }
}

customElements.get('image-comparison-viewer-dragger-handle') || customElements.define('image-comparison-viewer-dragger-handle', ImageComparisonViewerDraggerHandle);
