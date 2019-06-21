import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "login", component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
