import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { PatternDirective } from './core/pattern.directive';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DetailsComponent } from './details/details.component';
import { DataService } from './services/data.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PatternDirective,
    MainLayoutComponent,
    DetailsComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    NgxPaginationModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [DetailsComponent]
})
export class AppModule { }
