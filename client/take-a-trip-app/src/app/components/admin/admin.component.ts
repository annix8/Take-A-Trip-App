import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/city';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  myFiles: string[] = [];
  cities$: Observable<ICity[]>;
  placeName: string;
  selectedCityId: string;
  placeAddress: string;

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.cities$ = this.cityService.getAll();
  }

  getFileDetails(e) {
    this.myFiles = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  onSubmit() {
    // TODO: Add validation
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("fileUpload", this.myFiles[i]);
    }

    formData.append("placeName", this.placeName);
    formData.append("cityId", this.selectedCityId);
  }
}
