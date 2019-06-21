import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripRoutingModule } from './trip-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { CreatePlaceComponent } from './components/create-place/create-place.component';

@NgModule({
  declarations: [
    PlaceDetailsComponent,
    CityDetailsComponent,
    CreatePlaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TripRoutingModule
  ]
})
export class TripModule { }
