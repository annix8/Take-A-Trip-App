import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IPlace } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';
import { ActivatedRoute } from '@angular/router';
import { ICarouselImage } from 'src/app/models/carousel-image';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  place: IPlace;
  images: ICarouselImage[] = [];
  userGivenRating: number;
  showRatingComponent: boolean;

  constructor(private route: ActivatedRoute,
    private placeService: PlaceService,
    private userService: UserService,
    private authService: AuthenticationService,
    private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get("id");
    this.placeService.getById(placeId)
      .subscribe(place => {
        this.place = place;
        this.place.images.forEach(x => {
          this.images.push({ path: x, clickable: true } as ICarouselImage)
        });
      });

    this.userService.getUserRatingForPlace(placeId)
      .subscribe(rating => this.userGivenRating = rating);

      // TODO: Show overall rating always, show user rating when user is logged
    this.showRatingComponent = this.authService.isLoggedIn();
  }

  handleRatingClick(rating: number) {
    this.placeService.rate({
      userId: this.authService.getUserId(),
      placeId: this.place._id,
      rating: rating
    }).subscribe(result => {
      this.place.rating = result.response.rating;
      Swal.fire({
        text: `You have rated: ${rating}`,
        title: "Success",
        type: "success"
      });
    },
      error => {
        // if there is an error change and rollback user rating with change detection so that the rating is not changed
        const userGivenRatingCopy = this.userGivenRating;
        this.userGivenRating = 1;
        this.changeDetection.detectChanges();
        this.userGivenRating = userGivenRatingCopy;

        Swal.fire({
          text: error,
          title: "Error",
          type: "error"
        });
      });
  }

}
