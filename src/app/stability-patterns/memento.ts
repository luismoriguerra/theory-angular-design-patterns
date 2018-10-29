`
<div *ngFor="let movie of model.movies">
<p>{{movie.title}}</p>
<p>{{movie.year}}</p>
</div>
`
`
<form>
     <input id="title" name="title" type="text" [(ngModel)]="movie.title" />
     <input id="year" name="year" type="text" [(ngModel)]="movie.year" />
 </form>

 <a href="/back">Cancel</a>
`


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

    restore(movie:Movie){
        this.title = movie.title;
        this.year = movie.year;
    }
}


private memento:Movie;

constructor(private movie:Movie){

    this.memento = movie.clone();
}

public cancel(){
    this.movie.restore(this.memento);
}
