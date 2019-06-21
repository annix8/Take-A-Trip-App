import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripRoutingModule } from './trip-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { CreatePlaceComponent } from './components/create-place/create-place.component';
import { CitySearchComponent } from './components/city-search/city-search.component';

@NgModule({
  declarations: [
    PlaceDetailsComponent,
    CityDetailsComponent,
    CreatePlaceComponent,
    CitySearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TripRoutingModule
  ],
  exports: [
    CitySearchComponent
  ]
})
export class TripModule { }
