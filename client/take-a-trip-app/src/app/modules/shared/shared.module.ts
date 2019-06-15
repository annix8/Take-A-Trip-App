import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { TOKEN_KEY } from 'src/app/util/constants';

function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
}

@NgModule({
  declarations: [
    CarouselComponent
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
    HttpClientModule,
    NgbModule,
    JwtModule
  ]
})
export class SharedModule { }
