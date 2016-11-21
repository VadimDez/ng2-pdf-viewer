export declare class AppComponent {
    pdfSrc: string;
    page: number;
    rotation: number;
    zoom: number;
    originalSize: boolean;
    showAll: boolean;
    pdf: any;
    constructor();
    incrementPage(amount: number): void;
    incrementZoom(amount: number): void;
    rotate(angle: number): void;
    onFileSelected(): void;
    afterLoadComplete(pdf: any): void;
}
