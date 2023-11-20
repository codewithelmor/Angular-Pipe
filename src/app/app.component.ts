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

  filter: string = '';  

  constructor(
    private moviesService: MovieService
  ) {    
  }

  ngOnInit(): void {
  }

  onSearch(event: any) {
    this.search = event.target.value;    
    this.moviesService.list(this.search)
      .subscribe({
        next: (data) => {
          this.movies = data;
        },
        error: (error) => {
          //console.error(error);
        },
        complete: () => {
          //console.info('complete');
        }
      });
  }

  onFilter(event: any) {
    this.filter = event.target.value;    
  }

}
