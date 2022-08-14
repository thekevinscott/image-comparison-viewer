import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

type FilterChangeEventDetail = {
  name: string;
  value: string;
}

export class FilterChangeEvent extends Event {
  detail: FilterChangeEventDetail;

  constructor(name: string, value: string) {
    super('filter-change-event', {
      bubbles: true,
      cancelable: true,
    });

    this.detail = {
      name,
      value,
    }
  }
}

@customElement('image-comparison-viewer-filters')
export class ImageComparisonViewerFilters extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }
  `

  @property({ type: Object })
  values: Record<string, number | string> = {};

  handleChange = (e: Event) => {
    const target = e.target as (HTMLInputElement | HTMLSelectElement);
    this.dispatchEvent(new FilterChangeEvent(target.name, target.value));
  }

  render() {
    const { values, handleChange } = this;
    return html`
      <div>
        <label>Zoom</label>
        <input type="range" min="0" max="4" step="0.01" name="zoom" value="${values['zoom']}" @input=${handleChange} />
      </div>
      <div>
        <label>Background</label>
        <select @change=${handleChange} name="background" value=${values['background']}>
        <option>striped</option>
        <option>checkered</option>
        </select>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-comparison-viewer-filters': ImageComparisonViewerFilters;
  }
}

