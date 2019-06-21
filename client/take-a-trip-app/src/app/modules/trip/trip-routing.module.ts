import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "place/:id", component: PlaceDetailsComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class TripRoutingModule { }
