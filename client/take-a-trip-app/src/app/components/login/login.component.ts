import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSuccess: boolean | null;
  message: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(username, password) {
    this.authService.login(username, password)
      .subscribe(
        err => {
          this.isSuccess = false;
          this.message = JSON.stringify(err);
        },
        result => {
          this.isSuccess = true;
          this.message = JSON.stringify(result);
        }
      )
  }

  closeAlert(){
    this.isSuccess = null;
  }
}
