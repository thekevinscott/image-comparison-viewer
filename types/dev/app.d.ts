import { LitElement } from 'lit';
import { FilterChangeEvent } from './filters';
import '../src/components/viewer';
import '../src/components/dragger';
import './filters';
import { DraggerChangeEvent } from '../src/components/dragger';
export declare class ImageComparisonViewerApp extends LitElement {
    static styles: import("lit").CSSResult;
    values: Record<string, number | string>;
    handleChange: ({ detail }: FilterChangeEvent) => void;
    handleDrag: ({ detail }: DraggerChangeEvent) => void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'image-comparison-viewer-app': ImageComparisonViewerApp;
    }
}
