import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { Observable, of, Subject } from 'rxjs';
import { ICity } from 'src/app/models/city';
import { ICreatePlace } from 'src/app/models/create-place';
import { PlaceService } from 'src/app/services/place.service';
import { NgForm } from '@angular/forms';
import { swalSuccess, swalError } from 'src/app/util/swal-util';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.scss']
})
export class CreatePlaceComponent implements OnInit {
  cities$: Observable<ICity[]>;
  private searchTerms = new Subject<string>();
  createPlaceModel: ICreatePlace = {
    placeName: "",
    cityId: "",
    placeAddress: "",
    latitude: 0,
    longitude: 0,
    pictures: []
  };
  @ViewChild('form') public createPlaceForm: NgForm;
  @ViewChild('citySearchInput') public citySearchInput: ElementRef;

  constructor(private cityService: CityService,
    private placeService: PlaceService) { }

  ngOnInit() {
    this.cities$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.getAllByName(term)),
      catchError(error => { console.log(error); return of([]) })
    );
  }

  searchCity(searchValue: string){
    this.searchTerms.next(searchValue);
  }

  selectCity(city: ICity){
    this.createPlaceModel.cityId = city._id;
    this.citySearchInput.nativeElement.value = `${city.name}, ${city.country}`;
    this.searchTerms.next("");
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
          swalError(`An error occured: ${error}`);;
        }
      );
  }
}
