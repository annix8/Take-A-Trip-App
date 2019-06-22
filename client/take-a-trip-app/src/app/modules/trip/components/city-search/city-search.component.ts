import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ICity } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  cities$: Observable<ICity[]>;
  private browseTerms = new Subject<string>();

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.cities$ = this.browseTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.getAllByName(term)),
      catchError(error => { console.log(error); return of([]) })
    );
  }

  browse(browseValue: string) {
    this.browseTerms.next(browseValue);
  }
}
