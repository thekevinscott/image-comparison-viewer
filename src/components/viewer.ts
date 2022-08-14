import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';
import { Background } from './background';
import './background';
import './mask';
import './images';
import { InteractionController } from '../controllers/interaction-controller';

@customElement('image-comparison-viewer')
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

    ::slotted(img), img {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      user-drag: none;  
      user-select: none;
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
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

  handleSlotchange(e: any) {
    const target = e.target;
    if (isSlotElement(target)) {
      const childNodes = target.assignedNodes({ flatten: true }).filter(el => (<Element>el).tagName === 'IMG') as HTMLImageElement[];
      if (childNodes.length > 2) {
        console.warn('Only two images are supported')
      } else if (childNodes.length == 2) {
        this.images = childNodes;
        this.images.forEach(img => img.remove());
      } else if (childNodes.length == 1) {
        childNodes.forEach(node => node.remove());
      }
    }
  }

  renderImage(img?: HTMLImageElement) {
    if (img) {
      const { zoom, mouse } = this;
      const style = styleMap({
        transform: `scale(${zoom}) translate(${mouse.x / zoom}px, ${mouse.y / zoom}px)`,
      });
      return html`<img style=${style} src="${img.src}" />`;
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
        <slot @slotchange=${this.handleSlotchange}></slot>
         ${this.renderImage(this.images?.[0])}
         <image-comparison-viewer-mask comparisonX=${comparisonX}>
          ${this.renderImage(this.images?.[1])}
         </image-comparison-viewer-mask>
      </image-comparison-viewer-images>
    `
  }
}

const isSlotElement = (el: null | Element): el is HTMLSlotElement => el instanceof HTMLSlotElement;

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer': ImageComparisonViewer
  }
}
