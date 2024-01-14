import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieFilterPipe } from './shared/pipes/movie-filter.pipe';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { MoviesComponent } from './movies/movies.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { Movies2Component } from './movies2/movies2.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieFilterPipe,
    LoadingComponent,
    MoviesComponent,
    SpinnerComponent,
    Movies2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
