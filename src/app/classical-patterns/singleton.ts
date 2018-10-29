export class MySingleton{ 
     
    //The constructor is private so we  
    //can't do `let singleton:MySingleton = new MySingleton();` 
    private static instance:MySingleton = null; 
 
    private constructor(){ 
 
    } 
 
    public static getInstance():MySingleton{ 
        if(MySingleton.instance == null){ 
            MySingleton.instance = new MySingleton(); 
        }
        return MySingleton.instance; 
    } 
} 
 let singleton:MySingleton = MySingleton.getInstance();
 // Fail
 let singleton:MySingleton = new MySingleton(); 
 
 
 // Early Instanciation
 
 export class MySingleton
 {
   private static instance : MySingleton = new MySingleton();

 private constructor()
  {
   
  }
 
 }

singleton: MySingleton = MySingleton.getInstance();
 
 
 // Singleton Angular
 
 
  import { Injectable } from '@angular/core'; 
 
@Injectable() 
export class ApiService { 
 
  private static increment:number = 0; 
   
  public constructor(){ 
    ApiService.increment++; 
  } 
   
  public toString() :string { 
    return "Current instance: " + ApiService.increment; 
  } 
 
} 

 // ./app.component.ts

 import { Component } from '@angular/core'; 
import { ApiService } from './api.service'; 
 
@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'] 
}) 
export class AppComponent { 
  title = 'app'; 
 
  public constructor(api:ApiService){ 
    console.log(api); 
  } 
} 
 
// #######################33333

 // ./other/other.component.ts

 import { Component, OnInit } from '@angular/core'; 
import { ApiService } from './../api.service'; 
 
@Component({ 
  selector: 'app-other', 
  templateUrl: './other.component.html', 
  styleUrls: ['./other.component.css'] 
}) 
export class OtherComponent implements OnInit { 
 
  public constructor(api:ApiService){ 
    console.log(api); 
  } 
 
  ngOnInit() { 
  } 
 
} 

 //app.module.ts

 import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core'; 
import { MySingleton } from './singleton'; 
 
import { AppComponent } from './app.component'; 
import { OtherComponent } from './other/other.component'; 
 
import { ApiService } from './api.service'; 
 
@NgModule({ 
  declarations: [ 
    AppComponent, 
    OtherComponent 
  ], 
  imports: [ 
    BrowserModule 
  ], 
  providers: [ApiService], 
  bootstrap: [AppComponent] 
}) 
export class AppModule { 
 
} 



// Example 2
import { Component } from '@angular/core';

 import {MySingleton} from './singleton';
 import { SingletonService } from './singleton.service';

 @Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
 })
 export class AppComponent {
   title = 'app works!';

   constructor(private singleton:SingletonService){
     singleton.doStuff();
   }
   //OR
   constructor(){
     MySingleton.getInstance().doStuff();
   }
 }
