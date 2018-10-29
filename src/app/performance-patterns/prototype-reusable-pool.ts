export interface Prototype{
    clone():Prototype;
}

export class Movie implements Prototype {
 
    private title:string;
    private year:number;
    //...


    public constructor()
    public constructor(title:string = undefined, year:number = undefined)
    {
        if(title == undefined || year == undefined){
            //do the expensive creation
        }else{
            this.title = title;
            this.year = year;
        }
    }

    clone() : Movie {
        return new Movie(this.title, this.year);
    }
}

expansiveMovie:Movie = new Movie();
cheapMovie = expansiveMovie.clone();



export class MoviePool{
     
    private static movies:[{movie:Movie, used:boolean}] = [];
    private static nbMaxMovie = 10;
    private static instance:MoviePool;

    private static constructor(){}

    public static getMovie(){

        //first hard create
        if(MoviePool.movies.length == 0){

            MoviePool.movies.push({movie:new User(), used:true});
            return MoviePool.movies[0].movie;

        
        }else{

            for(var reusableMovie:{movie:Movie, used:boolean} of MoviePool.movies){
                if(!reusableMovie.used){
                    reusableMovie.used = true;
                    return reusableMovie.movie;
                }
            }
        }

        //subsequent clone create
        if(MoviePool.movie.length < MoviePool.nbMaxMovie){

            MoviePool.movies.push({movie:MoviePool.movies[MoviePool.movies.length - 1].clone(), used:true});
            return MoviePool.movies[MoviePool.movies.length - 1].movie;
        }
        
        throw new Error('Out of movies');
    }

    public static releaseMovie(movie:Movie){
        for(var reusableMovie:{movie:Movie, used:boolean} of MoviePool.movies){
            if(reusableMovie.movie === movie){
                reusableMovie.used = false;
            }
            return;
        }
    }
}
