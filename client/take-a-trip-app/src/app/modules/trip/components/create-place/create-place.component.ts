import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { Observable, of } from 'rxjs';
import { ICity } from 'src/app/models/city';
import { ICreatePlace } from 'src/app/models/create-place';
import { PlaceService } from 'src/app/services/place.service';
import { NgForm } from '@angular/forms';
import { swalSuccess, swalError } from 'src/app/util/swal-util';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.scss']
})
export class CreatePlaceComponent implements OnInit {
  cities$: Observable<ICity[]>;
  createPlaceModel: ICreatePlace = {
    placeName: "",
    cityId: "",
    placeAddress: "",
    latitude: 0,
    longitude: 0,
    pictures: []
  };
  @ViewChild('form') public createPlaceForm: NgForm;

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
    this.placeService.create(this.createPlaceModel)
      .subscribe(
        result => {
          this.createPlaceForm.reset();
          swalSuccess("Successfully created.");
        },
        error => {
          swalError(`An error occured ${error.message}`);;
        }
      );
  }
}
