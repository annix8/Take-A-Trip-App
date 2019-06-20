import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { TOKEN_KEY } from 'src/app/util/constants';
import { RatingComponent } from './components/rating/rating.component';

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
    JwtModule
  ]
})
export class SharedModule { }
