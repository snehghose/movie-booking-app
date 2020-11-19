import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { City, Theatre } from 'src/app/models/theatre.model';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-edit-theatre',
  templateUrl: './edit-theatre.component.html',
  styleUrls: ['./edit-theatre.component.css']
})
export class EditTheatreComponent implements OnInit {

  editTheatre:FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    totalSeats: ['0', [Validators.required, Validators.max(300), Validators.min(0)]]
  });
  cities: City[];
  theatre: Theatre;
  isSuccess = false;
  isError = false;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private theatreService: TheatreService ) { }

  ngOnInit(): void {
    this.cities= [City.BANGALORE, City.CHENNAI, City.DELHI, City.KOLKATA, City.MUMBAI];
    this.route.params.subscribe((params: Params) => {
      const theatreId = params['id'];
      this.theatreService.getTheatreById(theatreId).subscribe((threatre: Theatre) => {
        this.theatre = threatre;
        if (this.theatre) {
          this.editTheatre.patchValue({
            name: this.theatre.name,
            city: this.theatre.city,
            totalSeats: this.theatre.totalSeats,
            address: this.theatre.address
          });
        }
      })
    })
  }

  get editForm() {
    return this.editTheatre.controls;
  }

  get name() {
    return this.editForm['name'];
  }

  get city() {
    return this.editForm['city'];
  }

  get address() {
    return this.editForm['address'];
  }

  get totalSeats() {
    return this.editForm['totalSeats'];
  }

  onSubmit() {
    if (this.editTheatre.value) {
        this.theatre.name = this.name.value;
        this.theatre.city = this.city.value;
        this.theatre.address = this.address.value;
        this.theatre.totalSeats = this.totalSeats.value
        
        this.theatreService.updateTheatre(this.theatre).subscribe((data) =>
          this.isSuccess = true,
          () => this.isError = true
        );
      }
  }

}
