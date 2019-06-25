import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
