import { Component, OnInit, ViewChild } from '@angular/core';
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

    this.userService.getUserRatingForPlace(this.authService.getUserId(), placeId)
      .subscribe(rating => this.userGivenRating = rating);

    this.showRatingComponent = this.authService.isLoggedIn();
  }

  handleRatingClick(rating: number) {
    this.placeService.rate({
      userId: this.authService.getUserId(),
      placeId: this.place._id,
      rating: rating
    }).subscribe(result => {
      if(!result){
        Swal.fire({
          text: "Unexpected error",
          title: "Error",
          type: "error"
        });

        return;
      }

      Swal.fire({
        text: `You have rated: ${rating}`,
        title: "Success",
        type: "success"
      });
    });
  }

}
