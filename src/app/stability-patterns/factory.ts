class User{
    constructor(private lastName:string, private firstName:string){
    }
    hello(){
        console.log("Hi I am", this.firstName, this.lastName);
    }
}

export class POTOFactory{

    /**
     * Builds an User from json response
     * @param  {any}  jsonUser
     * @return {User}         
     */
    static buildUser(jsonUser: any): User {

        return new User(
            jsonUser.firstName,
            jsonUser.lastName
        );
    }

}
