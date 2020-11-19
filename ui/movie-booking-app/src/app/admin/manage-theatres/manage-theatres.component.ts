import { Component, OnInit } from '@angular/core';
import { Theatre } from 'src/app/models/theatre.model';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-manage-theatres',
  templateUrl: './manage-theatres.component.html',
  styleUrls: ['./manage-theatres.component.css']
})
export class ManageTheatresComponent implements OnInit {

  theatres: Theatre[];

  constructor( private theatreService: TheatreService ) { }

  ngOnInit(): void {
    this.theatreService.getAllTheatres().subscribe(theatreList => this.theatres = theatreList);
  }

  delete(theatre: Theatre) {
    this.theatreService.deleteTheatre(theatre.id).subscribe((data) => {
      if (data)
      window.alert("The Theatre cannot be deleted as it is connected to one or more Shows. Delete the Shows first then delete the Theatre");
      else
      this.theatreService.getAllTheatres().subscribe(theatreList => this.theatres = theatreList);
    });
  }

}
