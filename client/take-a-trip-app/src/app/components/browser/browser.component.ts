import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICity } from 'src/app/models/city';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {
  cities$: Observable<ICity[]>;
  private browseTerms = new Subject<string>();

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.cities$ = this.browseTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.getAllByName(term))
    );
  }

  browse(browseValue: string){
    this.browseTerms.next(browseValue);
  }
}
