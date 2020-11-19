import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieComponent } from './movies/movie/movie.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AddShowComponent } from './shows/add-show/add-show.component';
import { BookingComponent } from './shows/booking/booking.component';
import { EditShowComponent } from './shows/edit-show/edit-show.component';
import { TheatreListComponent } from './shows/theatre-list/theatre-list.component';
import { TicketComponent } from './shows/ticket/ticket.component';
import { ChangePasswordComponent } from './site/change-password/change-password.component';
import { LoginComponent } from './site/login/login.component';
import { PersonalDetailsComponent } from './site/personal-details/personal-details.component';
import { SignupComponent } from './site/signup/signup.component';
import { AddTheatreComponent } from './theatres/add-theatre/add-theatre.component';
import { EditTheatreComponent } from './theatres/edit-theatre/edit-theatre.component';
import { BookingHistoryComponent } from './user/booking-history/booking-history.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserDashboardComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'movie/details/:id',
    component: MovieComponent
  },
  {
    path: 'movie/add',
    component: AddMovieComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'movie/:id/edit',
    component: EditMovieComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'movies',
    component: MovieListComponent
  },
  {
    path: 'theatre/add',
    component: AddTheatreComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'theatre/:id/edit',
    component: EditTheatreComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'shows/:id',
    component: TheatreListComponent
  },
  {
    path: 'show/add',
    component: AddShowComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'show/:id/edit',
    component: EditShowComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'booking/:id',
    component: BookingComponent
  },
  {
    path: 'ticket/:id',
    component: TicketComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'booking-history',
    component: BookingHistoryComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'personal-details',
    component: PersonalDetailsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
