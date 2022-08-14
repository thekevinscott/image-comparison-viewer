import { LitElement } from 'lit';
declare type FilterChangeEventDetail = {
    name: string;
    value: string;
};
export declare class FilterChangeEvent extends Event {
    detail: FilterChangeEventDetail;
    constructor(name: string, value: string);
}
export declare class ImageComparisonViewerFilters extends LitElement {
    static styles: import("lit").CSSResult;
    values: Record<string, number | string>;
    handleChange: (e: Event) => void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'image-comparison-viewer-filters': ImageComparisonViewerFilters;
    }
}
export {};
