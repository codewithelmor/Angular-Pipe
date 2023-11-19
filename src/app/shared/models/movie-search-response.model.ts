import { MovieSearchModel } from "./movie-search.model";

export interface MovieSearchResponseModel {
    Search: MovieSearchModel[];
    totalResults: string;
    Response: string;
}