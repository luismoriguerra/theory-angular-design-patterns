export class Movie {

    public constructor(
        private _movie_id:number,
        private _title: string,
        private _phase: string,
        private _category_name: string,
        private _release_year: number,
        private _running_time: number,
        private _rating_name: string,
        private _disc_format_name: string,
        private _number_discs: number,
        private _viewing_format_name: string,
        private _aspect_ratio_name: string,
        private _status: string,
        private _release_date: string,
        private _budget: number,
        private _gross: number,
        private _time_stamp:Date){
    }

    public toString = () : string => {

        return `Movie (movie_id: ${this._movie_id},
        title: ${this._title},
        phase: ${this._phase},
        category_name: ${this._category_name},
        release_year: ${this._release_year},
        running_time: ${this._running_time},
        rating_name: ${this._rating_name},
        disc_format_name: ${this._disc_format_name},
     number_discs: ${this._number_discs},
        viewing_format_name: ${this._viewing_format_name},
        aspect_ratio_name: ${this._aspect_ratio_name},
        status: ${this._status},
        release_date: ${this._release_date},
        budget: ${this._budget},
        gross: ${this._gross},
        time_stamp: ${this._time_stamp})`;

    }
   //GETTER
   //SETTER
}

export enum MovieFields{
    movie_id,
    title,
    phase,
    category_name,
    release_year,
    running_time,
    rating_name,
    disc_format_name,
    number_discs,
    viewing_format_name,
    aspect_ratio_name,
    status,
    release_date,
    budget,
    gross,
    time_stamp
}

IMDBAPI.fetchOneById(1);
IMDBAPI.fetchByFields(MovieFields.release_date, 2015);


import { Injectable } from '@angular/core';
 import { Http }  from '@angular/http';
 import { Movie, MovieFields } from '../models/movie';
 import { Observable } from 'rxjs/Rx';
 import 'rxjs/Rx';

 @Injectable()

 export class IMDBAPIService {

   private moviesUrl:string = "app/marvel-cinematic-universe.json";

   constructor(private http: Http) { }
   /**
    * Return an Observable to a Movie matching id
    * @param  {number}           id
    * @return {Observable<Movie>}  
    */
   public fetchOneById(id:number):Observable<Movie>{
     console.log('fetchOneById', id);

         return this.http.get(this.moviesUrl)
         /**
         * Transforms the result of the HTTP get, which is observable
         * into one observable by item.
         */
         .flatMap(res => res.json().movies)

         /**
         * Filters movies by their movie_id

         */
         .filter((movie:any)=>{

             console.log("filter", movie);
             return (movie.movie_id === id)
         })

         /**
         * Map the JSON movie item to the Movie Model
         */
         .map((movie:any) => {

             console.log("map", movie);

             return new Movie(

                 movie.movie_id,
                 movie.title,
                 movie.phase,
                 movie.category_name,
                 movie.release_year,
                 movie.running_time,
                 movie.rating_name,
                 movie.disc_format_name,
                 movie.number_discs,
                 movie.viewing_format_name,
                 movie.aspect_ratio_name,
                 movie.status,
                 movie.release_date,
                 movie.budget,
                 movie.gross,
                 movie.time_stamp
             );
         });
   }
 }
