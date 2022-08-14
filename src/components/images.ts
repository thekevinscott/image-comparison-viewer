import { html, css, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('image-comparison-viewer-images')
export class ImageComparisonViewerImages extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      transform-origin: 0%;
      z-index: 1;
      transform-origin: center;
      width: 100%;
      height: 100%;
    }
  `
  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer-images': ImageComparisonViewerImages
  }
}

