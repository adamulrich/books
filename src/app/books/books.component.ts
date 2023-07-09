import { Component } from '@angular/core';
import { Book } from './book.model'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  // selectedBook: Book = {};

  ngOnInit(): void {
    
  }

  constructor() {}
}
