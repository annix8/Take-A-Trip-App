import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { TripRoutingModule } from './trip-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PlaceDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TripRoutingModule
  ]
})
export class TripModule { }
