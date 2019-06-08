import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/city';
import { ICreatePlace } from 'src/app/models/create-place';
import { PlaceService } from 'src/app/services/place.service';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  cities$: Observable<ICity[]>;
  showAlertMessage: boolean;
  alertMessage: string;
  createPlaceModel: ICreatePlace = {
    placeName: "",
    cityId: "",
    placeAddress: "",
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
          this.showAlertMessage = true;
          this.alertMessage = "Successfully created.";
        },
        error => {
          this.showAlertMessage = true;
          this.alertMessage = "An error occured " + error;
        }
      );
  }
}
