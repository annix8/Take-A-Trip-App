import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserComponent } from './components/browser/browser.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
    BrowserComponent,
    CityDetailsComponent,
    PlaceDetailsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    UserModule, // the order of routes is important!
    AppRoutingModule // the order of routes is important!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
