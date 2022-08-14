import { html, css, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { FilterChangeEvent } from './filters';
import '../src/components/viewer';
import '../src/components/dragger';
import './filters';
import { DraggerChangeEvent } from '../src/components/dragger';

@customElement('image-comparison-viewer-app')
export class ImageComparisonViewerApp extends LitElement {
  static styles = css`
    :host {
      width: 500px; 
    }

    #container {
      position: relative;
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
    comparisonX: .5,
    zoom: 1,

  };

  handleChange = ({ detail }: FilterChangeEvent) => {
    this.values[detail.name] = detail.value;
    this.requestUpdate();
  }

  handleDrag = ({ detail }: DraggerChangeEvent) => {
    this.values.comparisonX = detail.x;
    this.requestUpdate();
  }

  render() {
    const { handleChange, handleDrag, values } = this;
    console.log(values)
    return html`
      <div id="container">
        <image-comparison-viewer-dragger-handle @dragger-change-event=${handleDrag}></image-comparison-viewer-dragger-handle>
        <image-comparison-viewer zoom=${values['zoom']} background="${values['background']}" comparisonX=${values['comparisonX']}>
          <slot></slot>
        </image-comparison-viewer>
      </div id="container">
      <image-comparison-viewer-filters @filter-change-event=${handleChange} .values=${values}></image-comparison-viewer-filters>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer-app': ImageComparisonViewerApp
  }
}
