export type IDownloadManager = import("./interfaces").IDownloadManager;
/**
 * @implements {IDownloadManager}
 */
export class DownloadManager implements IDownloadManager {
    _openBlobUrls: WeakMap<object, any>;
    downloadUrl(url: any, filename: any): void;
    downloadData(data: any, filename: any, contentType: any): void;
    /**
     * @returns {boolean} Indicating if the data was opened.
     */
    openOrDownloadData(element: any, data: any, filename: any): boolean;
    /**
     * @param sourceEventType {string} Used to signal what triggered the download.
     *   The version of PDF.js integrated with Firefox uses this to to determine
     *   which dialog to show. "save" triggers "save as" and "download" triggers
     *   the "open with" dialog.
     */
    download(blob: any, url: any, filename: any, sourceEventType?: string): void;
}
