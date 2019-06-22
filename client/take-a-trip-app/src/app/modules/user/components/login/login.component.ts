import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(username, password) {
    this.authService.login(username, password)
      .subscribe(result => {
        if (result.success === true) {
          this.router.navigate(["/"]);
        }
        else {
          Swal.fire({
            text: result.response,
            title: "Error",
            type: "error"
          });
        }
      },
        err => {
          Swal.fire({
            text: `An error occured ${err}`,
            title: "Error",
            type: "error"
          });
        }
      )
  }
}
