export declare class AppComponent {
    pdfSrc: string;
    page: number;
    zoom: number;
    originalSize: boolean;
    showAll: boolean;
    pdf: any;
    constructor();
    incrementPage(amount: number): void;
    incrementZoom(amount: number): void;
    afterLoadComplete(pdf: any): void;
}
