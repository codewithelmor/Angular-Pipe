import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { Observable } from 'rxjs';
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
    pageSize: 15,
    totalResults: 0
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  private getPage(search: string, pageNumber: number): Observable<MovieSearchResponseModel> {
    return this.httpClient.get<MovieSearchResponseModel>(`${this.baseUrl}&s=${search}&page=${pageNumber}`);
  }  

  private getPages(search: string): MovieSearchPageModel {
    this.movies = [];
    this.pagination = {
      pages: 0,
      pageSize: 15,
      totalResults: 0
    };
    this.getPage(search, 1)
      .subscribe({
        next: (data) => {
          this.pagination.totalResults = parseInt(data.totalResults);
          this.pagination.pages = Math.ceil(this.pagination.totalResults / this.pagination.pageSize);
          let movies = data.Search;
          movies = map(movies, (m) => { 
            if (m.Poster === 'N/A') {
              m.Poster = 'https://placehold.co/300x450.png';
            }
            return { ...m };
          });
          this.movies = movies;
        },
        error: (error) => {
          //console.error(error);
        },
        complete: () => {
          //console.info('complete');
        }
      });
      return this.pagination;
  }

  list(search: string): MovieSearchModel[] {
    this.getPages(search);
    for (let page = 2; page <= this.pagination.pages; page++) {
      this.getPage(search, page)
      .subscribe({
        next: (data) => {
          let movies = data.Search;
          movies = map(movies, (m) => { 
            if (m.Poster === 'N/A') {
              m.Poster = 'https://placehold.co/300x450.png';
            }
            return { ...m };
          });          
          this.movies.push(...movies);
        },
        error: (error) => {
          //console.error(error);
        },
        complete: () => {
          //console.info('complete');
        }
      });
    }
    return this.movies;
  }

}
