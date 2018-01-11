/**
 * Created by vadimdez on 31/10/2016.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { PdfViewerModule } from './pdf-viewer/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatToolbarModule,

    PdfViewerModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {}