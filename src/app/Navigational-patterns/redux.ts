export interface IAppState { 
    logged: boolean; 
} 

import { Injectable } from '@angular/core'; 
import { Action } from 'redux'; 
 
@Injectable() 
export class LoginAction { 
  static LOGIN = 'LOGIN'; 
  static LOGOUT = 'LOGOUT'; 
 
  loggin(): Action { 
    return { type: LoginAction.LOGIN }; 
  } 
 
  logout(): Action { 
    return { type: LoginAction.LOGOUT }; 
  } 
} 


import { Action } from 'redux'; 
import { LoginAction } from './app.actions'; 
 
export interface IAppState { 
    logged: boolean; 
} 
 
export const INITIAL_STATE: IAppState = { 
  logged: false, 
}; 
 
export function rootReducer(lastState: IAppState, action: Action): IAppState { 
  switch(action.type) { 
    case LoginAction.LOGIN: return { logged: !lastState.logged }; 
    case LoginAction.LOGOUT: return { logged: !lastState.logged }; 
  } 
 
  // We don't care about any other actions right now. 
  return lastState; 
}


import { Component, OnDestroy } from '@angular/core'; 
 
import { NgRedux } from '@angular-redux/store'; 
import { LoginAction } from './app.actions'; 
import { IAppState } from "./store"; 
import { APIService } from './api.service'; 
 
@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'] 
}) 
export class AppComponent implements OnDestroy {  
  title = 'app'; 
  subscription; 
  logged: boolean; 
 
  constructor(                           
    private ngRedux: NgRedux<IAppState>, 
    private api:APIService) { 
 
      this.subscription = ngRedux.select<boolean>('logged') 
      .subscribe(logged => this.logged = logged);    
    }  
 
  login(email:string, password:string) { 
    this.api.login(email, password); 
  } 
 
  logout() { 
    this.api.logout(); 
  } 
 
  ngOnDestroy() {                     
    this.subscription.unsubscribe();  
  }     
} 

`
<div style="text-align:center"> 
  <p>{{logged}}</p> 
  <button (click)="login('foo', 'bar')">Login</button> 
  <button (click)="logout()">Logout</button> 
</div> 
`




import { Injectable } from '@angular/core'; 
import { Http }  from '@angular/http'; 
import { User } from './user'; 
import 'rxjs/Rx'; 
import { NgRedux } from '@angular-redux/store'; 
import { LoginAction } from './app.actions'; 
import {IAppState } from './store'; 
 
@Injectable() 
export class APIService { 
 
  private userURL:string = "assets/users.json"; 
 
  constructor( 
      private http: Http,  
      private ngRedux: NgRedux<IAppState>,  
      private actions: LoginAction) { } 
 
  /** 
   * Return a Promise to a USer matching id 
   * @param  {string}            email 
   * @param  {string}            password 
   * @return {Promise<User>}    
   */ 
  public login(email:string, password:string){ 
        console.log('login', email, password); 
 
        this.http.get(this.userURL) 
        /** 
         * Transforms the result of the http get, which is observable 
         * into one observable by item. 
         */ 
        .flatMap(res => res.json().users) 
        /** 
         * Filters users by their email & password 
         */ 
        .filter((user:any)=>{ 
            console.log("filter", user); 
            return (user.email === email && user.password == password) 
        }) 
        .toPromise() 
        /** 
         * Map the json user item to the User model 
        */ 
        .then((user:any) => { 
            console.log("map", user);  
            this.ngRedux.dispatch(this.actions.loggin()); 
        }); 
  }  
 
   /** 
   * Logout a User 
   */ 
  public logout(){ 
        this.ngRedux.dispatch(this.actions.logout()); 
  } 
 
} 



import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core'; 
import { HttpModule } from '@angular/http'; 
 
import { NgReduxModule, NgRedux } from '@angular-redux/store'; 
import { AppComponent } from './app.component'; 
 
import { rootReducer, IAppState, INITIAL_STATE } from './store'; 
import { LoginAction } from './app.actions'; 
import { APIService } from './api.service'; 
 
@NgModule({ 
  declarations: [ 
    AppComponent 
  ], 
  imports: [ 
    NgReduxModule, 
    HttpModule, 
  ], 
  providers: [APIService, LoginAction], 
  bootstrap: [AppComponent] 
}) 
export class AppModule {  
 
  constructor(ngRedux: NgRedux<IAppState>) { 
    // Tell @angular-redux/store about our rootReducer and our initial state. 
    // It will use this to create a redux store for us and wire up all the 
    // events. 
    ngRedux.configureStore( 
      rootReducer, 
      INITIAL_STATE); 
  } 
} 
