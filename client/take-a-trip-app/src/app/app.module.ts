import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { TripModule } from './modules/trip/trip.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserComponent } from './components/browser/browser.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
    BrowserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    TripModule, // the order of routes is important!
    UserModule, // the order of routes is important!
    AppRoutingModule // the order of routes is important!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
