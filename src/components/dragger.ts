import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
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

  updated() {
    const { mouse, parentElement } = this;
    const parent = parentElement as HTMLElement;
    const x = getX(mouse.x, parent);
    const width = parent.getBoundingClientRect().width;
    this.dispatchEvent(new DraggerChangeEvent(x / width));
  }

  render() {
    const { mouse, draggerRef, parentElement } = this;
    const x = getX(mouse.x, parentElement as HTMLElement);
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
        @click
      >
        <div class="image-slider-dot top"></div>
        <div id="image-slider-bar"></div>
        <div class="image-slider-dot bottom"></div>
      </div>
    `;
  }
}

const getX = (x: number, parent: HTMLElement) => {
  const width = parent.getBoundingClientRect().width;

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

