import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Show, ShowMap } from 'src/app/models/show.model';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-theatre-list',
  templateUrl: './theatre-list.component.html',
  styleUrls: ['./theatre-list.component.css']
})
export class TheatreListComponent implements OnInit {

  day0: Date;
  day1: Date;
  day2: Date;
  day3: Date;
  shows: Show[];

  constructor( private route: ActivatedRoute, private showService: ShowService ) { }

  ngOnInit(): void {
    var today = new Date();
    this.day0 = new Date();
    this.day1 = new Date(today.setDate(today.getDate() + 1));
    this.day2 = new Date(today.setDate(today.getDate() + 1));
    this.day3 = new Date(today.setDate(today.getDate() + 1));
    this.route.params.subscribe((params:Params) => {
      const movieId = params['id'];
      this.showService.getShowsByMovieIdAndDate(movieId, this.day0).subscribe(showList => {
        this.shows = showList;
      });
    });
  }

  onClickDate(date: Date) {
    this.route.params.subscribe((params:Params) => {
      const movieId = params['id'];
      this.showService.getShowsByMovieIdAndDate(movieId, date).subscribe(showList => {
        this.shows = showList;
      });
    });
  }


}
