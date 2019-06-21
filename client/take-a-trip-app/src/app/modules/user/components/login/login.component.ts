import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFailed: boolean;
  message: string;

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(username, password) {
    this.authService.login(username, password)
      .subscribe(result => {
        if (result.success === true) {
          this.loginFailed = false;
          this.router.navigate(["/"]);
        }
        else {
          this.loginFailed = true;
          this.message = JSON.stringify(result.error);
        }
      },
        err => {
          this.loginFailed = true;
          this.message = JSON.stringify(err);
        }
      )
  }

  closeAlert() {
    this.loginFailed = false;
  }
}
