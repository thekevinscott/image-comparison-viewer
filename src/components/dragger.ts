import { html, css, LitElement, PropertyValueMap } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {createRef, Ref, ref} from 'lit/directives/ref.js';
import { InteractionController } from '../controllers/interaction-controller';

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

@customElement('image-comparison-viewer-dragger-handle')
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

    #image-slider:hover #image-slider-bar {
      border: 1px solid #DF3373;
      background:  #FB5895;
      width: 4px;
    }
    #image-slider.active #image-slider-bar {
      border: 1px solid #DF3373;
      background:  #FB5895;
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

  private mouse: InteractionController = new InteractionController(this);

  draggerRef: Ref<HTMLDivElement> = createRef();

  @property({ type: Number })
  value = 0.5;

  @state()
  x = 0;

  getWidth() {
    const parent = this.parentElement as HTMLElement;
    return parent.getBoundingClientRect().width;
  }

  updateMouse(value: number) {
    const width = this.getWidth();
    const x = value * width;
    this.mouse.setPosition({
      x,
    });
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.updateMouse(this.value);
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.get('value') !== undefined) {
      this.updateMouse(changedProperties.get('value'));
    }
  }

  render() {
    const { mouse, draggerRef } = this;
    console.log('mouse x', mouse.x);
    return html`
      <div
        id="image-slider"
        ${ref(draggerRef)}
        class=${classMap({
          active: mouse.active,
        })}
        style=${styleMap({
          transform: `translate(${mouse.x}px, 0)`,
        })}
        @click
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

