export class Book {
    public constructor(public id:number, public title:string){
 
      this.id = id;
      this.title = title;
    }
 }

 import { Component } from '@angular/core';
import { Book } from './books'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  books: Book[] = [];
  constructor(){
    for (let i = 0; i < 10; i++) {
     
      this.books.push(new Book(i, this.makeid()))
    }
  }
  refresh(){
    let id =Math.floor(Math.random() * this.books.length)
    this.books[id].title = this.makeid();
    console.log(id, "refreshed")
  }
  private makeid(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
}

`
<ul>
  <li *ngFor="let book of books; let i = index">{{book.id}} - {{book.title}}</li>
</ul>
<button (click)="refresh()">Refresh</button>
`

`
<ul>
  <li *ngFor="let book of books; trackBy: trackByFn; let i = index">{{book.id}} - {{book.title}}</li>
</ul>
<button (click)="refresh()">Refresh</button>
The trackBy: trackByFn;we added references a function of our component named trackByFn
  trackByFn(index, item) {
    return index; // or item.id
  }
`
