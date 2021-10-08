import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AppointmentsComponent } from './appointments/appointments.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'properties',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  {
    path: 'myfavourite',
    component: FavouriteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myappointments',
    component: AppointmentsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
