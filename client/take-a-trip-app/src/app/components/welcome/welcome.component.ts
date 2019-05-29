import { Component, OnInit } from '@angular/core';
import { ICity } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  cities: ICity[];

  constructor(private cityService: CityService) { }

  ngOnInit() {
  }

  loadTestData() {
    this.cityService.getAll(true)
      .subscribe(cities => this.cities = cities);
  }

  hideTestData() {
    this.cities = [];
  }
}
