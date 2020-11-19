import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Theatre } from 'src/app/models/theatre.model';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit {

  addTheatre:FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    totalSeats: ['0', [Validators.required, Validators.max(300), Validators.min(0)]]
  });
  cities: City[];
  isSuccess = false;
  isError = false;

  constructor( private formBuilder: FormBuilder, private theatreService: TheatreService ) { }

  ngOnInit(): void {
    this.cities= [City.BANGALORE, City.CHENNAI, City.DELHI, City.KOLKATA, City.MUMBAI];
  }

  get addForm() {
    return this.addTheatre.controls;
  }

  get name() {
    return this.addForm['name'];
  }

  get city() {
    return this.addForm['city'];
  }

  get address() {
    return this.addForm['address'];
  }

  get totalSeats() {
    return this.addForm['totalSeats'];
  }

  onSubmit() {
    if (this.addTheatre.value) {
      const newTheatre: Theatre = {
        name: this.name.value,
        city: this.city.value,
        address: this.address.value,
        totalSeats: this.totalSeats.value
      }
      
      this.theatreService.addTheatre(newTheatre).subscribe((data) =>
        this.isSuccess = true,
        () => this.isError = true
      );
    }
  }

}
