import { Component, OnInit } from '@angular/core';
import { IPlace } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';
import { ActivatedRoute } from '@angular/router';
import { ICarouselImage } from 'src/app/models/carousel-image';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  place: IPlace;
  images: ICarouselImage[] = [];

  constructor(private route: ActivatedRoute,
    private placeService: PlaceService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get("id");
    this.placeService.getById(placeId)
      .subscribe(place => {
        this.place = place;
        this.place.images.forEach(x => {
          this.images.push({ path: x, clickable: true } as ICarouselImage)
        });
      });
  }

  handleRatingClick(rating: number) {
    this.placeService.rate({
      userId: this.authService.getUserId(),
      placeId: this.place._id,
      rating: rating
    }).subscribe(x => console.log(x));
  }

}