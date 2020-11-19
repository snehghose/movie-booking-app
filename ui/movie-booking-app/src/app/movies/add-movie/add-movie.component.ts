import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Genre, Language, Movie, Time } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  addMovie:FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    genre: [''],
    language: ['', Validators.required],
    releaseDate: ['', Validators.required],
    hours: ['0', [Validators.required, Validators.max(2), Validators.min(0)]],
    minutes: ['0', [Validators.required, Validators.max(59), Validators.min(0)]],
    rating: ['', Validators.required],
    plot: ['', Validators.required]
  });
  genres: string[];
  genreList= null;
  languages: Language[];
  isSuccess = false;
  isError = false;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private movieService: MovieService ) { }

  ngOnInit(): void {
    this.genreList= [
      {id: Genre.ACTION, value: "Action"}, 
      {id: Genre.DRAMA, value: "Drama"}, 
      {id: Genre.FANTASY, value: "Fantasy"}, 
      {id: Genre.HORROR, value: "Horror"}, 
      {id: Genre.SCIENCE_FICTION, value: "Science Fiction"}, 
      {id: Genre.THRILLER, value: "Thriller"}
    ];
    this.genres = [];
    this.languages= [Language.ENGLISH, Language.HINDI];
  }

  get addForm() {
    return this.addMovie.controls;
  }

  get name() {
    return this.addForm['name'];
  }

  get image() {
    return this.addForm['image'];
  }

  get genre() {
    return this.addForm['genre'];
  }

  get language() {
    return this.addForm['language'];
  }

  get releaseDate() {
    return this.addForm['releaseDate'];
  }

  get hours() {
    return this.addForm['hours'];
  }

  get minutes() {
    return this.addForm['minutes'];
  }

  get rating() {
    return this.addForm['rating'];
  }

  get plot() {
    return this.addForm['plot'];
  }

  onCheckboxChange(gen, event) {
    if (event.target.checked) {
      this.genres.push(gen.id);
    } else {
      for(var i=0;i<this.genres.length;i++) {
        if(this.genres[i] === gen.id)
        this.genres.splice(i,1);
      }
    }
  }

  onSubmit() {
    if (this.addMovie.value) {
      var time: number[] = [this.hours.value,
        this.minutes.value]
      const newMovie: Movie = {
        name: this.name.value,
        image: this.image.value,
        genre: this.genres,
        language: this.language.value,
        releaseDate: this.releaseDate.value,
        duration: time,
        rating: this.rating.value,
        plot: this.plot.value
      }
      
      this.movieService.addMovie(newMovie).subscribe((data) =>
        this.isSuccess = true,
        () => this.isError = true
      );
    }
  }

}
