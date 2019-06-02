import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserComponent } from './components/browser/browser.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
    BrowserComponent,
    CityDetailsComponent,
    PlaceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
