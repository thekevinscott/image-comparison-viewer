import { html, css, LitElement } from 'lit'

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

customElements.get('image-comparison-viewer-images') || customElements.define('image-comparison-viewer-images', ImageComparisonViewerImages);
