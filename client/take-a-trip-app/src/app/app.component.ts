import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthenticationService,
    private router: Router) {

  }

  logout() {
    this.authService.logout();
    Swal.fire({
      title: 'Success',
      type: 'success',
      text: 'You have successfully logged out',
      timer: 2500,
      onClose: () => {
        this.router.navigateByUrl("/");
      }
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUsername() {
    return this.authService.getUsername();
  }
}
