import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Show, ShowMap } from 'src/app/models/show.model';
import { Theatre } from 'src/app/models/theatre.model';
import { AuthService } from 'src/app/services/auth.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-theatre-item',
  templateUrl: './theatre-item.component.html',
  styleUrls: ['./theatre-item.component.css']
})
export class TheatreItemComponent implements OnInit {

  @Input()
  show: Show;

  theatre: Theatre;
  time: string;

  constructor( private router: Router, private theatreService: TheatreService, private authService: AuthService ) { }

  ngOnInit(): void {
    if (this.show) {
      this.time = this.show.startTime;
      this.theatreService.getTheatreById(this.show.theatreId).subscribe(theatre => {
        this.theatre = theatre;
      });
    }
  }

  onBookTicket(showId: string) {
    const user = this.authService.loggedInUser.value;
    if (user)
    this.router.navigate(['/booking',showId]);
    else
    this.router.navigate(['/login']);
  }

}
