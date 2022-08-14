import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';

export type Background = 'striped' | 'checkered';
const BACKGROUNDS = ['checkered', 'striped'];

@customElement('image-comparison-viewer-background')
export class ImageComparisonViewerBackground extends LitElement {
  static styles = css`
    #background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }

    .striped {
      background: repeating-linear-gradient(
        -45deg,
        #fff,
        #fff 10px,
        rgba(4, 60, 94, 0.1) 10px,
        rgba(4, 60, 94, 0.1) 20px
      );
    }

    .checkered {
      background: repeating-conic-gradient(
        #fff 0 90deg,
        rgba(4, 60, 94, 0.1) 0 180deg)
      0 0/30px 30px round;
    }

    html[data-theme='dark'] {
      .striped {
        background: repeating-linear-gradient(
          -45deg,
          #00080f,
          #00080f 10px,
          #15232e 10px,
          #15232e 20px,
        );
      }

      .checkered {
        background: repeating-conic-gradient(
          #00080f 0 90deg,
          #15232e 0 180deg) 
        0 0/30px 30px round;
      }
    }
  `

  @property()
  background: Background = 'striped';

  render() {
    return html`
      <div id="background" class=${classMap({ [getBackground(this.background)]: true })}></div>
    `
  }
}

const isBackground = (background: string): background is Background => BACKGROUNDS.includes(background);
const getBackground = (background: string): Background => isBackground(background) ? background : 'striped';

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer-background': ImageComparisonViewerBackground;
  }
}

