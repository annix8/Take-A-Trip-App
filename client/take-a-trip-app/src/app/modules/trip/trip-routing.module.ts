import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "city/:id", component: CityDetailsComponent },
      { path: "place/:id", component: PlaceDetailsComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class TripRoutingModule { }
