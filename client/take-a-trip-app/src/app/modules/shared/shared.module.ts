import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { CarouselComponent } from './components/carousel/carousel.component';
import { RatingComponent } from './components/rating/rating.component';

import { TOKEN_KEY } from 'src/app/util/constants';
import { environment } from 'src/environments/environment';
import { HereMapComponent } from './components/here-map/here-map.component';


function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
}

@NgModule({
  declarations: [
    CarouselComponent,
    RatingComponent,
    HereMapComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.apiUrl],
      }
    }),
    SweetAlert2Module.forRoot({})
  ],
  exports: [
    CarouselComponent,
    RatingComponent,
    HttpClientModule,
    NgbModule,
    JwtModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class SharedModule { }
