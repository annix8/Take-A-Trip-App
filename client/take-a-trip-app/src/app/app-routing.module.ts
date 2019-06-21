import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", component: WelcomeComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthenticationGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
