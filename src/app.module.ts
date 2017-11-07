/**
 * Created by vadimdez on 31/10/2016.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { MDL } from './app/mdl';
import { PdfViewerModule } from './pdf-viewer/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PdfViewerModule
  ],
  declarations: [MDL, AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {}