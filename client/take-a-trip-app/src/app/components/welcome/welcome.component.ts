import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICity } from 'src/app/models/city';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  cities: ICity[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  loadTestData() {
    const citiesUrl = "http://localhost:3200/api/cities";
    this.http.get<ICity[]>(citiesUrl).subscribe(cities => this.cities = cities);
  }

  hideTestData(){
    this.cities = [];
  }
}
