export interface Observer{ 
    notify(); 
}

export class HumanObserver implements Observer{ 
    constructor(private name:string){}

    notify(){

        console.log(this.name, 'Notified');
    } 
} 

private name:string; 
constructor(name:string){
    this.name = name;
}


export class Subject{
    private observers:Observer[] = [];
    
    /**
    * Adding an observer to the list of observers
    */
    attachObserver(observer:Observer):void{
    
            this.observers.push(observer);
    }
    
    /**
    * Detaching an observer
    */
    detachObserver(observer:Observer):void{
    
        let index:number = this.observers.indexOf(observer);
    
        if(index > -1){
    
            this.observers.splice(index, 1);
        }else{
    
            throw "Unknown observer";
        }
    }
    
    /**
    * Notify all the observers in this.observers
    */
    protected notifyObservers(){
    
        for (var i = 0; i < this.observers.length; ++i) {
    
            this.observers[i].notify();
        }
    } 
} 


export class IMDB extends Subject{

    private movies:string[] = [];

     public addMovie(movie:string){

         this.movies.push(movie);
         this.notifyObservers();
     }
 }


 let imdb:IMDB = new IMDB();
 let mathieu:HumanObserver = new HumanObserver("Mathieu");
 imbd.attachObserver(mathieu);
 imbd.addMovie("Jaws");

 imdb.detachObserver(mathieu);
 imdb.addMovie("Die Hard");
