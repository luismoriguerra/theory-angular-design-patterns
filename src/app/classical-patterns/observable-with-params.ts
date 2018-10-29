export interface Observer{

    notify(value?:any, subject?:Subject);
}

export class HumanObserver implements Observer{

    constructor(private name:string){}

    notify(value?:any, subject?:Subject){

        console.log(this.name, 'received', value, 'from', subject);
    }
}


export class Subject{

    private observers:Observer[] = [];

    attachObserver(oberver:Observer):void{

        this.obervers.push(oberver);
    }

    detachObserver(observer:Observer):void{
        let index:number = this.obervers.indexOf(observer);
        if(index > -1){
            this.observers.splice(index, 1);

        }else{

            throw "Unknown observer";
        }
    }

    protected notifyObservers(value?:any){

        for (var i = 0; i < this.obervers.length; ++i) {

            this.observers[i].notify(value, this);
        }
    }
}

export class IMDB extends Subject{

    private movies:string[] = [];

    public addMovie(movie:string){

        this.movies.push(movie);
        this.notifyObservers(movie);
    }
}

Mathieu received Jaws from IMDB {

    observers: [ HumanObserver { name: 'Mathieu' } ],
    movies: [ 'Jaws' ] }
