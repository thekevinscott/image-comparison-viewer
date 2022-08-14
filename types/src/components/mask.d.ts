import { LitElement } from 'lit';
export declare class ImageComparisonViewerMask extends LitElement {
    static styles: import("lit").CSSResult;
    comparisonX: number;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'image-comparison-viewer-mask': ImageComparisonViewerMask;
    }
}
