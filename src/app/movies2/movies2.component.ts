import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieSearchModel } from '../shared/models/movie-search.model';
import { LoadingService } from '../shared/services/loading.service';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movies2',
  templateUrl: './movies2.component.html',
  styleUrl: './movies2.component.css'
})
export class Movies2Component implements OnInit {

  title = 'angular-pipe';

  public movies$: Observable<MovieSearchModel[]> = new Observable();

  public search: string = '';

  public filter: string = '';  

  constructor(
    private moviesService: MovieService,
    protected loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.search = 'Harry Potter';
    this.movies$ = this.loadingService.showLoaderUntilCompleted(this.moviesService.list(this.search));
  }

  onSearch(event: any) {
    this.loadingService.loadingOn();
    this.search = event.target.value;
    this.movies$ = this.loadingService.showLoaderUntilCompleted(this.moviesService.list(this.search));
  }

  onFilter(event: any) {
    this.filter = event.target.value;    
  }

}
