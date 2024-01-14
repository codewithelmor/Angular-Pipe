import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { Movies2Component } from './movies2/movies2.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies2', component: Movies2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
