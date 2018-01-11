import { CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef } from '@angular/cdk/table';
/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
export declare class MatHeaderRowDef extends CdkHeaderRowDef {
}
/**
 * Data row definition for the mat-table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
export declare class MatRowDef<T> extends CdkRowDef<T> {
}
/** Header template container that contains the cell outlet. Adds the right class and role. */
export declare class MatHeaderRow extends CdkHeaderRow {
}
/** Data row template container that contains the cell outlet. Adds the right class and role. */
export declare class MatRow extends CdkRow {
}
