import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { Observable, of } from 'rxjs';
import { ICity } from 'src/app/models/city';
import { ICreatePlace } from 'src/app/models/create-place';
import { PlaceService } from 'src/app/services/place.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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
          Swal.fire({
            text: `Successfully created.`,
            title: "Success",
            type: "success"
          });
        },
        error => {
          Swal.fire({
            text: `An error occured ${error.message}`,
            title: "Error",
            type: "error"
          });
        }
      );
  }
}
