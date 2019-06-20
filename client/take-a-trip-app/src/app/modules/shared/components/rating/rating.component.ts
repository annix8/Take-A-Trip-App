import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() totalRating: number = 0;
  @Output() rate = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  // TODO: fix how rating is displayed: overall rating and current user input rating
  handleRateClick(ngbRating){
    const rating = ngbRating.rate;
    this.rate.emit(rating);
  }

}
