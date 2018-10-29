class User { 
     
    public constructor(private _email:string, private _password:string){} 
 
    get email():string{ 
        return this._password; 
    } 
 
    get password():string{ 
        return this._email; 
    } 
 
    set email(email:string){ 
        this._password = email; 
    } 
 
    set password(password:string){ 
        this._email = password; 
    } 
} 

user:User = new User('mathieu.nayrolles@gmail.com', 'password');

 console.log(user.email); // will print mathieu.nayrolles@gmail.com

 var email = function(){
    return "mathieu.nayrolles@gmail.com";
}
console.log(email);

// ########################################################
import { User } from '../poto/user'; 
import { APIService } from '../services/api.service'; 
 
export class UserModel{ 
     
    private user:User; 
    private _loading:boolean = false; 

    public constructor(private api:APIService){} 
 
    public signin(email:string, password:string){ 
 
        this._loading = true; 
 
        this.api.getUser(email, password).then( 
 
            user => { 
                this.user = user; 
                this._loading = false; 
            } 
        ); 
    } 
 
    public signup(email:string, password:string){ 
 
        this._loading = true; 
        this.api.postUser(email, password).then( 
            user => { 
                this.user = user; 
                this._loading = false; 
            }    
        ); 
    } 
 
    get loading():boolean{ 
        return this._loading; 
    } 
 
} 

// ############## API service
import { Injectable } from '@angular/core'; 
import { Http }  from '@angular/http'; 
import { User } from '../poto/user'; 
import { Observable } from 'rxjs/Rx'; 
import 'rxjs/Rx'; 
import { resolve } from 'dns'; 
import { reject } from 'q'; 
 
@Injectable() 
export class APIService { 
 
  private userURL:string = "assets/users.json"; 
 
  constructor(private http: Http) { } 
 
  /** 
   * Return a Promise to a USer matching id 
   * @param  {string}            email 
   * @param  {string}            password 
   * @return {Promise<User>}    
   */ 
  public getUser(email:string, password:string):Promise<User>{ 
      console.log('getUser', email, password); 
 
        return this.http.get(this.userURL) 
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
            return new User( 
                email, 
                password 
            ) 
        }); 
  }  
 
   /** 
   * Post an user Promise to a User 
   * @param  {string}            email 
   * @param  {string}            password 
   * @return {Promise<User>}    
   */ 
  public postUser(email:string, password:string):Promise<User>{ 
     
    return new Promise<User>((resolve, reject) => { 
        resolve(new User( 
            email, 
            password 
        )); 
    }); 
  } 
 
}

// ######### Component
@Component({
    templateUrl: 'user.html'
})
export class UserComponent{

    private model:UserModel;

    public UserComponent(api:APIService){

        this.model = new UserModel(api);
    }


    public signinClick(email:string, password:string){
        this.model.signin(email, password);
    }

    public signupClick(email:string, password:string){
        this.model.signup(email, password);
    }

}

// ###### html
`
<h1>Signin</h1>

<form action="#" onsubmit="signinClick(this.email.value, this.password.value); return false;">

    email: <input name="email" type="text" id="email">
    password: <input name="password" type="password" id="password">
   <input [hidden]="model.loading" type="submit">
   <i [hidden]="!model.loading" class="fa fa-spinner" aria-hidden="true"></i>
</form>

<h1>Signup</h1>

<form action="#" onsubmit="signupClick(this.email.value, this.password.value); return false;">

    email: <input name="email" type="text" id="email">
    password: <input name="password" type="password" id="password">
    <input [hidden]="model.loading" type="submit">
    <i [hidden]="!model.loading" class="fa fa-spinner" aria-hidden="true"></i>
</form>
`

// ##### Advancec MVC pattern in Angular - typescript

export interface IModel{

    protected get(POTO):POTO;
    protected put(POTO):POTO;
    protected post(POTO):POTO;
    protected delete(POTO):boolean;
    protected patch(POTO):POTO;

}


export class AbstractModel<T extends POTO> implements IModel{
    protected T domainModel;

    public AbstractModel(protected api:APIService){}

    protected get(POTO):T{
        //this.api.get ...
    };
    protected put(T):T{
        //this.api.put...
    };
    protected post(T):T{
        //this.api.post...
    };
    protected delete(T):boolean{
        //this.api.delete...
    };
    protected patch(T):T{
        //this.api.patch...
    };
}

export class UserModel extends AbstractModel<User>{

    public AbstractModel(api:APIService){
        super(api);
    }

    public signin(email:string, password:string){

        this._loading = true;

        this.get(new User(email, password)).then(

            user => {
                this.user = user;
                this._loading = false;
            }
        );
    }

    public signup(email:string, password:string){

        this._loading = true;
        this.post(new User(email, password)).then(
            user => {
                this.user = user;
                this._loading = false;
            }   
        );
    }
    //Only the code specialized for the UI ! 
}


export class UserController{

    public UserComponent(protected model:UserModel){
    }

    public signin(email:string, password:string){
        this.model.signin(email, password);
    }

    public signup(email:string, password:string){
        this.model.signup(email, password);
    }

}

export class LoginPage extends UserController{

    public LoginPage(api:APIService){
        super(new UserModel(api));
    }

    //Only what's different on mobile !

}


export class LoginPage extends UserController{

    public LoginPage(api:APIService){
        super(new UserModel(api));
    }

    //Only what's different on mobile !

}
