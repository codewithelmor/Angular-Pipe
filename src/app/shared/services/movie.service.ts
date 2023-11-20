import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatMap, map } from 'lodash';
import { Observable, Observer, forkJoin, mergeMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MovieSearchPageModel } from '../models/movie-search-page.model';
import { MovieSearchResponseModel } from '../models/movie-search-response.model';
import { MovieSearchModel } from '../models/movie-search.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = `${environment.api}/?apikey=${environment.apikey}`

  public movies: MovieSearchModel[] = [];

  public pagination: MovieSearchPageModel = {
    pages: 0,
    pageSize: 10,
    totalResults: 0
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  private getPage(search: string, pageNumber: number): Observable<MovieSearchResponseModel> {
    return this.httpClient.get<MovieSearchResponseModel>(`${this.baseUrl}&s=${search}&page=${pageNumber}`);
  }

  private getPageDetail(movies: MovieSearchResponseModel): Observable<MovieSearchPageModel> {
    // Create an observable
    const observable = new Observable<MovieSearchPageModel>((observer: Observer<MovieSearchPageModel>) => {
      let pagination: MovieSearchPageModel ={
        pages: 0,
        pageSize: 10,
        totalResults: parseInt(movies.totalResults)
      };
      pagination.pages = Math.ceil(pagination.totalResults / pagination.pageSize);      
      // Emit values to the observer
      observer.next(pagination);
      // Complete the observable
      observer.complete();
    });
    return observable;
  }

  private getPagination(search: string): Observable<MovieSearchPageModel> {
    // Create an observable    
    const observable = this.getPage(search, 1).pipe(
      mergeMap((movies) => {
        // The result of the first observable is available here
        // You can call another observable based on the first result
        return this.getPageDetail(movies);
      })
    );
    return observable;
  }

  private getAllMovies(search: string): Observable<MovieSearchResponseModel[]> {
    return this.getPagination(search).pipe(
      mergeMap((pagination) => {
        const requests = [];
        for (let page = 1; page <= pagination.pages; page++) {
          requests.push(this.getPage(search, page));
        }
        return forkJoin(requests);
      })
    );
  }

  private repairPosters(responses: MovieSearchResponseModel[]): Observable<MovieSearchModel[]> {
    // Create an observable
    const observable = new Observable<MovieSearchModel[]>((observer: Observer<MovieSearchModel[]>) => {
      let movies = flatMap(responses, (r) => { return r.Search });
      movies = map(movies, (m) => { 
        if (m.Poster === 'N/A') {
          m.Poster = 'https://placehold.co/300x450.png';
        }
        return { ...m };
      });
      // Emit values to the observer
      observer.next(movies);
      // Complete the observable
      observer.complete();
    });
    return observable;
  }

  public list(search: string): Observable<MovieSearchModel[]> {
    // Create an observable    
    const observable = this.getAllMovies(search).pipe(
      mergeMap((responses) => {
        // The result of the first observable is available here
        // You can call another observable based on the first result
        return this.repairPosters(responses);
      })
    );
    return observable;
  }

}
