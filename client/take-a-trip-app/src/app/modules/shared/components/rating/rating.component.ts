import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() totalRating: number = 0;
  @Input() givenRating: number = 0;
  @Input() maxRating: number = 10;
  @Output() rate = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  
  handleRateClick(ngbRating){
    const rating = ngbRating.rate;
    this.rate.emit(rating);
  }

}
