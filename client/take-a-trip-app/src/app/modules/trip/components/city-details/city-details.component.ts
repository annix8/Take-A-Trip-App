import { Component, OnInit } from '@angular/core';
import { ICity } from 'src/app/models/city';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/services/city.service';

@Component({
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {
  city: ICity;

  constructor(private activatedRoute: ActivatedRoute,
    private cityService: CityService) { }

  ngOnInit() {
    const cityId: string = this.activatedRoute.snapshot.paramMap.get("id");
    this.cityService.getById(cityId)
      .subscribe(city => this.city = city);
  }

}
