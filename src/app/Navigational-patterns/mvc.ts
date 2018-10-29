class Movie{ 
     
    constructor(private title:string, private release_year:number){} 
     
    public getTitle():string{ 
        return this.title; 
    } 
    public getReleaseYear():number{ 
        return this.release_year; 
    } 
} 

/// <reference path="./movie.ts"/> 
 
class Model{ 
     
    private movies:Movie[] = []; 
 
    constructor(){ 
    } 
 
    public addMovie(title:string, year:number){ 
        let movie:Movie = new Movie(title, year); 
        this.movies.push(movie); 
        this.appendView(movie); 
    } 
 
    private appendView(movie:Movie){ 
        var node = document.createElement("LI");  
        var textnode = document.createTextNode(movie.getTitle() + "-" + movie.getReleaseYear());  
        node.appendChild(textnode); 
        document.getElementById("movies").appendChild(node); 
    } 
 
} 


/// <reference path="./model.ts"/> 
 
class Controller{ 
     
    private model:Model; 
 
    constructor(){ 
 
        this.model = new Model(); 
    } 
 
    click(title:string, year:number){ 
 
        console.log(title, year); 
        this.model.addMovie(title, year); 
 
    } 
 
} 
let controller = new Controller(); 

`
<html> 
    <head> 
        <script src="mvc.js"></script> 
    </head> 
    <body> 
        <h1>Movies</h1> 
 
        <div id="movies"> 
 
        </div> 
 
        <form action="#" onsubmit="controller.click(this.title.value, this.year.value); return false;"> 
             
            Title: <input name="title" type="text" id="title"> 
            Year: <input name="year" type="text" id="year"> 
           <input type="submit"> 
        </form> 
         
    </body> 
</html> 
`


var Movie = /** @class */ (function () { 
    function Movie(title, release_year) { 
        this.title = title; 
        this.release_year = release_year; 
    } 
    Movie.prototype.getTitle = function () { 
        return this.title; 
    }; 
    Movie.prototype.getReleaseYear = function () { 
        return this.release_year; 
    }; 
    return Movie; 
}()); 
/// <reference path="./movie.ts"/> 
var Model = /** @class */ (function () { 
    function Model() { 
        this.movies = []; 
    } 
    Model.prototype.addMovie = function (title, year) { 
        var movie = new Movie(title, year); 
        this.movies.push(movie); 
        this.appendView(movie); 
    }; 
    Model.prototype.appendView = function (movie) { 
        var node = document.createElement("LI"); 
        var textnode = document.createTextNode(movie.getTitle() + "-" + movie.getReleaseYear()); 
        node.appendChild(textnode); 
        document.getElementById("movies").appendChild(node); 
    }; 
    return Model; 
}()); 
/// <reference path="./model.ts"/> 
var Controller = /** @class */ (function () { 
    function Controller() { 
        this.model = new Model(); 
    } 
    Controller.prototype.click = function (title, year) { 
        console.log(title, year); 
        this.model.addMovie(title, year); 
    }; 
    return Controller; 
}()); 
var controller = new Controller(); 
