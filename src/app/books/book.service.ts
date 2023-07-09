import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  books: Book[] = [];
  bookListChangedEvent = new Subject<Book[]>();
  maxBookId: number = 0;

  urlExpress: string = "http://localhost:3000/books";

  constructor(
    private httpClient: HttpClient) { }

  getBooks(): any {
    this.httpClient.get<{message: String, books: Book[]}>(this.urlExpress).subscribe(

      // success method

      (responseData) => {
        this.books = responseData.books;
        console.log(this.books);
        this.maxBookId = this.getMaxId();
        // sort the list of books
        this.sortAndSend();
      },
      // error method
      (error: any) => {
        // print the error to the console
        console.log(error);
      }
    )
  }

  getBook(id: Number) {
    return this.books.find(book => book.id == id);
  }


  updateBook(originalBook: Book, newBook: Book) {
    if (!originalBook || !newBook) {
      return;
    }

    const pos = this.books.findIndex(d => d.id === originalBook.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Book to the id of the old Book
    newBook.id = originalBook.id;
    // not needed. put leaves data alone if not included.
    // newBook._id = originalBook._id;
    

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.httpClient.put(this.urlExpress +'/' + originalBook.id,
      newBook, { headers: headers })
      .subscribe(
        () => {
          this.books[pos] = newBook;
          this.sortAndSend();
        }
      );
  }


  addBook(book: Book) {
    if (!book) {
      return;
    }

    // make sure id of the new Book is empty
    book.id = 0;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient.post<{ message: string, book: Book }>(this.urlExpress,
      book,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new book to books
          this.books.push(responseData.book);
          this.sortAndSend();
        }
      );
  }
  getMaxId(): number {
    return Math.max(...this.books.map(d => +d.id), 0)
  }


  deleteBook(book: Book) {

    if (!book) {
      return;
    }

    const pos = this.books.findIndex(d => d.id === book.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient.delete(this.urlExpress +'/' + book.id)
      .subscribe(
        () => {
          this.books.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    var booksListClone = this.books.slice();
    booksListClone.sort((a, b) => (a.title < b.title) ? 1 : (a.title > b.title) ? -1 : 0);
    // emit the next contact list change event
    this.bookListChangedEvent.next(booksListClone)
    return booksListClone
  }
}

