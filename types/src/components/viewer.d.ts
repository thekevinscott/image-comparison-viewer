import { LitElement } from 'lit';
import { Background } from './background';
import './background';
import './mask';
import './images';
export declare class ImageComparisonViewer extends LitElement {
    static styles: import("lit").CSSResult;
    private mouse;
    background: Background;
    zoom: number;
    comparisonX: number;
    images: HTMLImageElement[] | undefined;
    handleSlotchange(e: any): void;
    renderImage(img?: HTMLImageElement): import("lit").TemplateResult<1> | null;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'image-comparison-viewer': ImageComparisonViewer;
    }
}
