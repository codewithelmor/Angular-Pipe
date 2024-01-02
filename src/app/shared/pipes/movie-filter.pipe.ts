import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'lodash';
import { Observable, map } from 'rxjs';
import { MovieSearchModel } from '../models/movie-search.model';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(values: Observable<MovieSearchModel[]>, parameter: string): Observable<MovieSearchModel[]> {
    if (parameter !== undefined && parameter !== null && parameter !== '') {
      return values.pipe(
        map(movies => filter(movies, m => 
          m['Year'].toLowerCase().includes(parameter.toLowerCase()) ||
          m['Title'].toLowerCase().includes(parameter.toLowerCase()) || 
          m['Type'].toLowerCase().includes(parameter.toLowerCase())
          ))
      );
    }
    return values;
  }

}
