import { html, css, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { FilterChangeEvent } from './filters';
import '../src/components/viewer';
import '../src/components/handle';
import './filters';
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
  `

  @state()
  values: Record<string, number | string> = {
    background: 'striped',
    zoom: 1,
  };

  handleChange = ({ detail }: FilterChangeEvent) => {
    this.values[detail.name] = detail.value;
    this.requestUpdate();
  }

  @state()
  imageKind = 'jellyfish'

  switch = () => {
    this.imageKind = this.imageKind === 'jellyfish' ? 'dog' : 'jellyfish';
  }

  render() {
    const { imageKind, handleChange, values } = this;
    // return html`
    //   <div id="container">
    //     <image-comparison-viewer-dragger-handle initialValue=${this.values.comparisonX} @dragger-change-event=${handleDrag}></image-comparison-viewer-dragger-handle>
    //     <image-comparison-viewer zoom=${values['zoom']} background="${values['background']}" comparisonX=${values['comparisonX']}>
    //       <img src="./assets/${imageKind}-a.jpg" />
    //       <img src="./assets/${imageKind}-b.jpg" />
    //     </image-comparison-viewer>
    //   </div id="container">
    //   <image-comparison-viewer-filters @filter-change-event=${handleChange} .values=${values}></image-comparison-viewer-filters>
    //   <hr />
    //   Showing ${imageKind} as the image. <br />
    //   <button @click=${this.switch}>Switch the image to ${imageKind === 'jellyfish' ? 'dog' : 'jellyfish'}</button>
    // `;
    return html`
      <div id="container">
        <image-comparison-viewer showHandle zoom=${values['zoom']} background="${values['background']}">
          <img src="./assets/${imageKind}-a.jpg" />
          <img src="./assets/${imageKind}-b.jpg" />
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
