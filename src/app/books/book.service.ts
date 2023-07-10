import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

// BOOK SERVICE
//
export class BookService implements OnInit {

    books: Book[] = [];
    bookListChangedEvent = new Subject<Book[]>();
    maxBookId: number = 0;

    urlExpress: string = "http://127.0.0.1:3000/books";

    //on init
    //
    ngOnInit(): void {
        this.books = this.getBooks();
    }

    // constructor
    // using injection
    //
    constructor(
        private httpClient: HttpClient) { }

    //
    // GET all books
    //
    getBooks(): any {
        this.httpClient.get<{ message: String, books: Book[] }>(this.urlExpress)
        .subscribe(

            // success method

            (responseData) => {
                this.books = responseData.books;
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

    //
    // GET a book
    //
    //
    getBook(id: Number) {
        return this.books.find(book => book.id == id);
    }

    //
    // UPDATE a book (using put)
    //
    //
    updateBook(originalBook: Book, newBook: Book) {
        if (!originalBook || !newBook) {
            return;
        }

        const pos = this.books.findIndex(d => d.id === originalBook.id);

        if (pos < 0) {
            return;
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // update database
        this.httpClient.put(this.urlExpress + '/' + originalBook.id,
            newBook, { headers: headers })
            .subscribe(
                () => {
                    this.books[pos] = newBook;
                    this.sortAndSend();
                }
            );
    }

    // ADD a book (using post)
    //    
    addBook(book: Book) {
        if (!book) {
            return;
        }

        // get the latest book id
        console.log(this.getMaxId());
        book.id = this.getMaxId() + 1

        // set the author;
        console.log(book.author['_id']);

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // add to database
        this.httpClient.post<{ message: string, book: Book }>(this.urlExpress,
            book,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    // add new book to books
                    responseData.book.author = book.author;
                    this.books.push(responseData.book);
                    this.sortAndSend();
                }
            );
    }

    //
    // get maxId from data
    // helper function for creating new authors
    //
    getMaxId(): number {
        return Math.max(...this.books.map(d => +d.id), 0)
    }

    //
    // DELETE an author
    //    
    deleteBook(book: Book) {

        if (!book) {
            return;
        }

        const pos = this.books.findIndex(d => d.id === book.id);

        if (pos < 0) {
            return;
        }

        // delete from database
        this.httpClient.delete(this.urlExpress + '/' + book.id)
            .subscribe(
                () => {
                    this.books.splice(pos, 1);
                    this.sortAndSend();
                }
            );
    }

    sortAndSend() {
        var booksListClone = this.books.slice();
        booksListClone.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 0);
        // emit the next contact list change event
        this.bookListChangedEvent.next(booksListClone)
        return booksListClone
    }
}

