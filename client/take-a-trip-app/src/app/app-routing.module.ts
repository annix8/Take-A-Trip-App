import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: WelcomeComponent },
  { path: "city/:id", component: CityDetailsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
