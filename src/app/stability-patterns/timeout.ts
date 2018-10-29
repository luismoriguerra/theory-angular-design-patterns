import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
 
@Injectable() 
export class ApiService { 
 
  constructor(private http: HttpClient) { } 
 
  public getURL(url: string): void { 
 
    let timeout; 
 
    let sub = this.http.get(url) 
      .subscribe((res) => { 
        console.log(res); 
        clearTimeout(timeout) 
      }); 
 
    timeout = setTimeout( 
      () => { sub.unsubscribe() }, 1000 
    ); 
  } 
 
} 

import { Component } from '@angular/core'; 
import { ApiService } from './api.service'; 
 
@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'] 
}) 
export class AppComponent { 
  title = 'app'; 
 
  constructor(private api: ApiService){ 
    api.getURL("https://github.com/MathieuNls/Angular-Design-Patterns-and-Best-Practices") 
  } 
}



import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core'; 
import { HttpClientModule } from '@angular/common/http'; 
 
import { AppComponent } from './app.component'; 
import { ApiService } from './api.service'; 
 
@NgModule({ 
  declarations: [ 
    AppComponent 
  ], 
  imports: [ 
    BrowserModule, 
    HttpClientModule 
  ], 
  providers: [ApiService], 
  bootstrap: [AppComponent] 
}) 
export class AppModule { } 


