import { Item } from "./item";
export interface OnlineCommand {
  fetchItems() : Item[]
}

import { Component } from '@angular/core';
import { OnlineCommand } from './online-command';

@Component({
   selector: 'app-root',
   template: `
   <ul>
     <li *ngFor="let item of commands; let i = index" (click)="item.fetchItems()">
       {{i}} {{item}}
     </li>
   </ul>
   `,
   styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private commands:OnlineCommand[]
}


import { OnlineCommand } from "./online-command";
import { Item } from "./item";

//RealCommand is a real command that has the right to do
//API calls
export class RealCommand implements OnlineCommand{

   public fetchItems() : Item[] {
      //This would come from an API call
      return [new Item(), new Item()];
  }
}


import { OnlineCommand } from "./online-command";
import { RealCommand } from "./real-command";
import { Item } from "./item";

//A Proxified Command
export class ProxyfiedCommand implements OnlineCommand{

     //Reference to the real deal
     private real:RealCommand;

     //Constructor
     constructor() {
        this.real = new RealCommand();
     }

     //The Proxified fetchItems.
     //It only exists as a placeholder and if we need it
     //we' ll the real command.
     public fetchItems() : Item[] {
       console.log("About the call the API");
       let items = this.real.fetchItems();
       console.log("Called it");
       return items;
    }
}
