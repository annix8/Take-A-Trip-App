import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/city';
import { ICreatePlace } from 'src/app/models/create-place';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  cities$: Observable<ICity[]>;
  createPlaceModel: ICreatePlace = {
    placeName: "",
    cityId: "",
    placeAddress: "",
    pictures: []
  };

  constructor(private cityService: CityService,
    private placeService: PlaceService) { }

  ngOnInit() {
    this.cities$ = this.cityService.getAll();
  }

  getFileDetails(e) {
    this.createPlaceModel.pictures = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.createPlaceModel.pictures.push(e.target.files[i]);
    }
  }

  onSubmit() {
    // TODO: Add validation
    this.placeService.create(this.createPlaceModel);
  }
}
