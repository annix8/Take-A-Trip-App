import { Component, OnInit } from '@angular/core';
import { ICity } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { WELCOME_IMAGES } from 'src/app/lib/constants';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  cities: ICity[];
  images = WELCOME_IMAGES;

  constructor(private cityService: CityService) { }

  ngOnInit() {
  }

  loadTestData() {
    this.cityService.getAll()
      .subscribe(cities => this.cities = cities);
  }

  hideTestData() {
    this.cities = [];
  }
}
