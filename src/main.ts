/**
 * Created by vadimdez on 21/06/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { MDL } from './app/mdl';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [MDL, AppComponent, PdfViewerComponent],
  bootstrap: [AppComponent]
})

class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
