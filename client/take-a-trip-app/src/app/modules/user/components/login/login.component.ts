import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { swalError } from 'src/app/util/swal-util';

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
          swalError(result.response);
        }
      },
        err => {
          swalError(`An error occured ${err}`);
        }
      )
  }
}
