import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieSearchModel } from '../shared/models/movie-search.model';
import { LoadingService } from '../shared/services/loading.service';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  title = 'angular-pipe';

  private moviesSubject: BehaviorSubject<MovieSearchModel[]> = new BehaviorSubject<MovieSearchModel[]>([]);
  public movies$: Observable<MovieSearchModel[]> = this.moviesSubject.asObservable();

  search: string = '';

  filter: string = '';  

  constructor(
    private moviesService: MovieService,
    protected loadingService: LoadingService
  ) {    
  }

  ngOnInit(): void {
  }

  onSearch(event: any) {
    this.loadingService.loadingOn();
    this.moviesSubject.next([]);
    this.search = event.target.value;
    this.moviesService.list(this.search)
      .subscribe({
        next: (data) => {
          this.moviesSubject.next(data);
          this.loadingService.loadingOff();
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
