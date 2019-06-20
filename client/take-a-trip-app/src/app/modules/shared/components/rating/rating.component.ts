import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() rate = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  handleRateClick(ngbRating){
    const rating = ngbRating.rate;
    this.rating = rating;
    this.rate.emit(rating);
  }

}
