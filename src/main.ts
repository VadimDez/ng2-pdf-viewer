import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  document.write(
    '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
  );
  document.write(
    '<script>(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-7000744132425449", enable_page_level_ads: true });</script>'
  );
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
