import { Component, OnInit } from '@angular/core';
import { MovieSearchModel } from './shared/models/movie-search.model';
import { MovieService } from './shared/services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'angular-pipe';

  movies: MovieSearchModel[] = [];

  search: string = '';

  constructor(
    private moviesService: MovieService
  ) {    
  }

  ngOnInit(): void {
    this.movies = this.moviesService.list('Harry Potter');
  }

  onSearch(event: any) {
    this.search = event.target.value;
  }

}
