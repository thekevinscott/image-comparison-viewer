import { html, css, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';

export class ImageComparisonViewerMask extends LitElement {
  static styles = css`
    .image-mask {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .image-mask-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  `

  @property({ type: Number })
  comparisonX = .5

  render() {
    const { comparisonX } = this;
    const comparisonXPosition = getComparisonXPosition(comparisonX);
    return html`
      <div class="image-mask" style=${styleMap({transform: `translate(${comparisonXPosition * 100}%, 0)`})}>
        <div class="image-mask-inner" style=${styleMap({ transform: `translate(${comparisonXPosition * -100}%, 0)` })}>
          <slot></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer-mask': ImageComparisonViewerMask
  }
}

const getComparisonXPosition = (x: number) => {
  if (x < 0 || x > 1) {
    console.warn(`x must be a number between 0 and 1. You provided ${x}.`);

    if (x < 0) {
      return 0;
    }

    return 1;
  }

  return x;
}

customElements.get('image-comparison-viewer-mask') || customElements.define('image-comparison-viewer-mask', ImageComparisonViewerMask);
