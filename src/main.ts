import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();

  document.write(
    '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
  );
  document.write(
    '<script>(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-7000744132425449", enable_page_level_ads: true });</script>'
  );
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection()
  ]
})
  .catch(err => console.error(err));
