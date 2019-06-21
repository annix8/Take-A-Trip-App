import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';

import { CarouselComponent } from './components/carousel/carousel.component';
import { RatingComponent } from './components/rating/rating.component';
import { environment } from 'src/environments/environment';
import { TOKEN_KEY } from 'src/app/util/constants';

function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
}

@NgModule({
  declarations: [
    CarouselComponent,
    RatingComponent
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
    })
  ],
  exports: [
    CarouselComponent,
    RatingComponent,
    HttpClientModule,
    NgbModule,
    JwtModule,
    FormsModule
  ]
})
export class SharedModule { }
