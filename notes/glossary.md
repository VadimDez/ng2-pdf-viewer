# Glossary

## Zoom Control

### Zoom Scale

- **Purpose**: Predefined zoom strategies for PDF viewing
- **Types**:
  - `page-width`: Fits PDF to viewport width
  - `page-height`: Fits PDF to viewport height
  - `page-fit`: Fits entire PDF page in viewport
- **Location**: Used in `AppComponent` and `PDFViewerComponent`

### Zoom Level

- **Purpose**: Numeric value representing the current zoom magnification
- **Implementation**: Stored in `zoom` property of `AppComponent`
- **Control**: Can be adjusted via:
  - Incremental buttons (+/-)
  - Direct numeric input
  - Programmatic updates

### Original Size

- **Purpose**: Toggle between original PDF dimensions and scaled view
- **Effect**: When enabled, disables zoom scale selection
- **Location**: `originalSize` property in `AppComponent`
