import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './site/header/header.component';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TheatreListComponent } from './shows/theatre-list/theatre-list.component';
import { TheatreItemComponent } from './shows/theatre-item/theatre-item.component';
import { BookingComponent } from './shows/booking/booking.component';
import { ManageMoviesComponent } from './admin/manage-movies/manage-movies.component';
import { ManageTheatresComponent } from './admin/manage-theatres/manage-theatres.component';
import { ManageShowsComponent } from './admin/manage-shows/manage-shows.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { AddShowComponent } from './shows/add-show/add-show.component';
import { EditShowComponent } from './shows/edit-show/edit-show.component';
import { AddTheatreComponent } from './theatres/add-theatre/add-theatre.component';
import { EditTheatreComponent } from './theatres/edit-theatre/edit-theatre.component';
import { ChangePasswordComponent } from './site/change-password/change-password.component';
import { PersonalDetailsComponent } from './site/personal-details/personal-details.component';
import { BookingHistoryComponent } from './user/booking-history/booking-history.component';
import { TicketComponent } from './shows/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    MovieListComponent,
    MovieComponent,
    MovieItemComponent,
    TheatreListComponent,
    TheatreItemComponent,
    BookingComponent,
    ManageMoviesComponent,
    ManageTheatresComponent,
    ManageShowsComponent,
    AddMovieComponent,
    EditMovieComponent,
    AddShowComponent,
    EditShowComponent,
    AddTheatreComponent,
    EditTheatreComponent,
    ChangePasswordComponent,
    PersonalDetailsComponent,
    BookingHistoryComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
