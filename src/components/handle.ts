import { html, css, LitElement, PropertyValueMap } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {createRef, Ref, ref} from 'lit/directives/ref.js';
import { InteractiveLitElement } from '../controllers/interaction-controller';

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

export class ImageComparisonViewerDraggerHandle extends LitElement {
  static styles = css`
    #image-slider {
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

    #image-slider:hover #image-slider-bar,
    #image-slider.active #image-slider-bar {
      border: 1px solid #006aa0;
      background: #0284c7;
      width: 4px;
    }

    #image-slider-bar {
      transition-duration: 0.1s;
      background: white;
      border: 1px solid #043C5E;
      width: 4px;
      height: calc(100% - 10px);
    }

    .image-slider-dot {
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

    .image-slider-dot.bottom {
      top: calc(100% - 5px);
    }
  `

  private mouse: InteractiveLitElement = new InteractiveLitElement(this, undefined, { preventDefault: true });

  draggerRef: Ref<HTMLDivElement> = createRef();

  @property({ type: Number })
  initialValue = 0.5;

  @property({ type: Number })
  zoom = 1;

  @state()
  x = 0;

  @state()
  comparisonx: number | undefined;

  @state()
  width = 0;

  setWidth() {
    let parent = this.parentElement as HTMLElement;
    if (parent === null) {
      parent = (this.getRootNode() as any)?.host;
    }
    if (parent === null) {
      throw new Error('Parent of drag handle is null');
    } else {
      this.width = parent.getBoundingClientRect().width;
    }
  }

  updateMouse(value: number) {
    const x = value * this.width;
    this.mouse.setPosition({
      x,
    });
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.updateMouse(this.initialValue);
  }

  private setComparisonX() {
    const { x, width, comparisonx } = this;
    // const x = getX(this.x, this.width);
    if (width > 0) {
      const nextComparisonX = x / width;
      if (nextComparisonX !== comparisonx) {
        this.comparisonx = nextComparisonX;
        this.dispatchEvent(new DraggerChangeEvent(this.comparisonx));
      }
    }
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const { zoom, mouse, x, width } = this;
    this.setWidth();
    if (x !== mouse.x) {
      console.log('change x')
      this.x = getX(mouse.x, width);
      // this.x = getX(mouse.x, width / zoom) * zoom;
    }
    if (_changedProperties.has('x')) {
      console.log('x', x)
      this.setComparisonX();
    }
    if (_changedProperties.has('zoom')) {
      console.log('zoom!', zoom)
    }
  }

  render() {
    const { x, mouse, draggerRef, zoom } = this;
    console.log('x', x);
    // const x = getX(mouse.x, this.width);

    return html`
      <div
        id="image-slider"
        ${ref(draggerRef)}
        class=${classMap({
          active: mouse.active,
        })}
        style=${styleMap({
          transform: `translate(${x}px, 0)`,
        })}
      >
        <div class="image-slider-dot top"></div>
        <div id="image-slider-bar"></div>
        <div class="image-slider-dot bottom"></div>
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
