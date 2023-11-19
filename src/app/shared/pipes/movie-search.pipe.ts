import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'lodash';
import { MovieSearchModel } from '../models/movie-search.model';

@Pipe({
  name: 'movieSearch'
})
export class MovieSearchPipe implements PipeTransform {

  transform(values: MovieSearchModel[], search: string): MovieSearchModel[] {
    let filteredValues: MovieSearchModel[] = [];

    let filteredTitle = filter(values, m => m['Title'].toLowerCase().includes(search.toLowerCase()));
    if (filteredTitle.length > 0) {
      filteredValues.push(...filteredTitle);
    }

    let filteredYear = filter(values, m => m['Year'].toLowerCase().includes(search.toLowerCase()));
    if (filteredYear.length > 0) {
      filteredValues.push(...filteredYear);
    }

    let filteredType = filter(values, m => m['Type'].toLowerCase().includes(search.toLowerCase()));
    if (filteredType.length > 0) {
      filteredValues.push(...filteredType);
    }

    return filteredValues;
  }

}
