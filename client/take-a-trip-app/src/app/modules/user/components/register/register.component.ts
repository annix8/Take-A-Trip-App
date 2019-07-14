import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { swalError } from 'src/app/util/swal-util';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(username: string, email: string, password: string) {
    this.authService.register(username, email, password)
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
