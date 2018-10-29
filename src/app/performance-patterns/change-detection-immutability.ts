import { Component, Input } from '@angular/core';
import { Book } from './book'
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'app';
  @Input() book: Book;
  constructor(){
    this.book = new Book(1, "Some Title");
  }
  changeMe(){
    this.book = new Book(this.book.id, "Some Other Title");
  }
}
