import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Genre, Language, Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  editMovie:FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    genre: [''],
    language: ['', Validators.required],
    releaseDate: ['', Validators.required],
    hours: ['', [Validators.required, Validators.max(2), Validators.min(0)]],
    minutes: ['', [Validators.required, Validators.max(59), Validators.min(0)]],
    rating: ['', Validators.required],
    plot: ['', Validators.required]
  });
  genres: string[];
  genreList= null;
  languages: Language[];
  isSuccess = false;
  isError = false;
  movie: Movie;

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
    this.route.params.subscribe((params: Params) => {
      const movieId = params['id'];
      this.movieService.getMovieById(movieId).subscribe((movie: Movie) => {
        this.movie = movie;
        if (this.movie) {
          this.editMovie.patchValue({
            name: this.movie.name,
            image: this.movie.image,
            language: this.movie.language,
            releaseDate: (new Date(this.movie.releaseDate)).toISOString().slice(0,10),
            hours: this.movie.duration[0],
            minutes: this.movie.duration[1],
            rating: this.movie.rating,
            plot: this.movie.plot
          });
        }
      })
    })
  }

  get editForm() {
    return this.editMovie.controls;
  }

  get name() {
    return this.editForm['name'];
  }

  get image() {
    return this.editForm['image'];
  }

  get genre() {
    return this.editForm['genre'];
  }

  get language() {
    return this.editForm['language'];
  }

  get releaseDate() {
    return this.editForm['releaseDate'];
  }

  get hours() {
    return this.editForm['hours'];
  }

  get minutes() {
    return this.editForm['minutes'];
  }

  get rating() {
    return this.editForm['rating'];
  }

  get plot() {
    return this.editForm['plot'];
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
    if (this.editMovie.value) {
      var time: number[] = [this.hours.value,
        this.minutes.value]
      this.movie.name = this.name.value;
      this.movie.image = this.image.value;
      this.movie.genre = this.genres;
      this.movie.language = this.language.value;
      this.movie.releaseDate = this.releaseDate.value;
      this.movie.duration = time;
      this.movie.rating = this.rating.value;
      this.movie.plot = this.plot.value;
      
      this.movieService.updateMovie(this.movie).subscribe((data) =>
        this.isSuccess = true,
        () => this.isError = true
      );
    }
  }

}
