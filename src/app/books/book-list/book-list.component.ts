import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/authors/author.service';
import { Author } from 'src/app/authors/author.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy{
  @Output() selectedBookEvent  = new EventEmitter<Book>();
  books: Book[] = [];
  authors: Author[] = [];
  id: Number = 0;
  term: string = "";

  private subscription: Subscription;
  constructor(private bookService: BookService,
              private authorService: AuthorService)
  
  {

  }

  ngOnInit(): void {
      this.books = this.bookService.getBooks();
      this.authors = this.authorService.getAuthors();
      this.subscription = this.bookService.bookListChangedEvent.subscribe(
          (booksList: Book[]) => {
              this.books = booksList;
          }
      )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value.toLowerCase();
    
    }
  
}
