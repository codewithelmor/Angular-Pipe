import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, finalize, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(observable$: Observable<T>): Observable<T> {
    return of(null)
    .pipe(
      tap(() => this.loadingOn()),
      concatMap(() => observable$),
      finalize(() => this.loadingOff())
    );
  }
  
  loadingOn() {
    this.loadingSubject.next(true);
    console.log('loadingOn was called');
  }

  loadingOff() {
    this.loadingSubject.next(false);
    console.log('loadingOff was called');
  }
  
}
