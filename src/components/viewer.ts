import { html, css, LitElement } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';
import { Background } from './background';
import './background';
import './mask';
import './images';
import { InteractionController } from '../controllers/interaction-controller';

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

    .image-container {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `
  private mouse: InteractionController = new InteractionController(this);

  @property()
  background: Background = 'striped';

  @property({ type: Number })
  zoom = 1

  @property({ type: Number })
  comparisonX = .5

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

  renderImage(img?: HTMLImageElement) {
    if (img) {
      const { zoom, mouse } = this;
      const x = mouse.x / zoom;
      const y = mouse.y / zoom;
      const style = styleMap({
        transform: `scale(${zoom}) translate(calc(${x}px), calc(${y}px))`,
      });
      return html`<div class="image-container"><img style=${style} src="${img.src}" /></div>`;
    }

    return null;
  }

  render() {
    const { background, comparisonX } = this;
    return html`
      <slot name="background">
        <image-comparison-viewer-background background=${background}></image-comparison-viewer-background>
      </slot>
      <image-comparison-viewer-images>
        <slot id="slot" @slotchange=${this.handleSlotchange}></slot>
         ${this.renderImage(this.images?.[0])}
         <image-comparison-viewer-mask comparisonX=${comparisonX}>
          ${this.renderImage(this.images?.[1])}
         </image-comparison-viewer-mask>
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
