import { html, css, LitElement, PropertyValueMap } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { FilterChangeEvent } from './filters';
import '../src/components/viewer';
import '../src/components/handle';
import './filters';
import jellyfishA from './assets/jellyfish-a.jpg';
import jellyfishB from './assets/jellyfish-b.jpg';
import dogA from './assets/dog-a.jpg';
import dogB from './assets/dog-b.jpg';
// import { DraggerChangeEvent } from '../src/components/handle';

@customElement('image-comparison-viewer-app')
export class ImageComparisonViewerApp extends LitElement {
  static styles = css`
    :host {
    }

    #container {
      height: 500px;
      border: 1px solid rgba(0,0,0,0.2);
    }

    #filters {
      display: flex;
    }
  `;

  canvasRef: Ref<HTMLCanvasElement> = createRef();

  @state()
  values: Record<string, number | string> = {
    background: 'striped',
    zoom: 1,
  };

  handleChange = ({ detail }: FilterChangeEvent) => {
    this.values[detail.name] = detail.value;
    this.requestUpdate();
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('imageKind')) {
      this.updateCanvas(this.imageKind);
    }
  }

  firstUpdated() {
    this.updateCanvas(this.imageKind);
  }

  updateCanvas(imageKind: string) {
    const canvas = this.canvasRef.value!;
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageKind === 'jellyfish' ? jellyfishA : dogA;
  }

  @state()
  imageKind = 'jellyfish'

  switch = () => {
    this.imageKind = this.imageKind === 'jellyfish' ? 'dog' : 'jellyfish';
  }

  render() {
    const { imageKind, handleChange, values } = this;
    return html`
      <div id="container">
        <image-comparison-viewer zoom=${values['zoom']} background="${values['background']}">
          <canvas width="199" height="199" ${ref(this.canvasRef)}></canvas>
          <img width="199" height="199" src="${imageKind === 'jellyfish' ? jellyfishB : dogB}" />
        </image-comparison-viewer>
      </div id="container">
      <image-comparison-viewer-filters @filter-change-event=${handleChange} .values=${values}></image-comparison-viewer-filters>
      <hr />
      Showing ${imageKind} as the image. <br />
      <button @click=${this.switch}>Switch the image to ${imageKind === 'jellyfish' ? 'dog' : 'jellyfish'}</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer-app': ImageComparisonViewerApp
  }
}
