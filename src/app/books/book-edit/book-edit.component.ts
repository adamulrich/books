import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthorService } from 'src/app/authors/author.service';
import { Author } from 'src/app/authors/author.model';

@Component({
    selector: 'app-book-edit',
    templateUrl: './book-edit.component.html',
    styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, OnDestroy {
    originalBook: Book;
    book: Book = {
        id: 0,
        title: "",
        subTitle: "",
        series: "",
        year: 0,
        imageUrl: "",
        author: {
            id: 0,
            name: "",
            imageUrl: "",
            bioUrl: ""
        }

    };
    editMode: boolean = false;
    id: Number;
    groupBooks: Book[] = [];
    authors: Author[] = this.authorService.authors;

    @ViewChild('f') bookForm: NgForm;

    constructor(
        private bookService: BookService,
        private router: Router,
        private route: ActivatedRoute,
        private authorService: AuthorService
    ) {
        bookService.getBooks();
    }

    onCancel() {
        this.router.navigate(['/books']);
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];

                if (this.id == null || this.id == undefined) {
                    this.editMode = false;
                    return
                }
                this.originalBook = this.bookService.getBook(this.id);

                if (this.originalBook == undefined || this.originalBook == null) {
                    return
                }
                this.editMode = true;
                this.book = { ...this.originalBook };
                console.log(this.book);

            }
        )
    }


    onSubmit(form: NgForm) {

        const value = form.value;
        const author = this.authorService.getAuthor(value.author)
        const newBook = new Book(
            value.id,
            value.title,
            value.subTitle,
            value.series,
            value.year,
            value.imageUrl,
            author
        );

        
        console.log("The new book is:" + newBook);

        if (this.editMode) {

            this.bookService.updateBook(this.originalBook, newBook)
        } else {
            newBook.id = this.bookService.getMaxId();
            this.bookService.addBook(newBook)
        }

        this.onCancel()
    }

    ngOnDestroy(): void { }

    isInvalidBook(newBook: Book) {
        if (!newBook) {// newBook has no value
            return true;
        }
        if (this.book && newBook.id === this.book.id) {
            return true;
        }
        for (let i = 0; i < this.groupBooks.length; i++) {
            if (newBook.id === this.groupBooks[i].id) {
                return true;
            }
        }
        return false;
    }

    addToGroup($event: any) {
        const selectedBook: Book = $event.dragData;
        const invalidGroupBook = this.isInvalidBook(selectedBook);
        if (invalidGroupBook) {
            console.log('invalid')
            return;
        }
        console.log('pushing' + selectedBook.toString())
        this.groupBooks.push(selectedBook);
    }

    onRemoveItem(index: number) {
        if (index < 0 || index >= this.groupBooks.length) {
            return;
        }
        this.groupBooks.splice(index, 1);
    }

    authorSelected: any;

    onAuthorSelected($event) {
        console.log($event); //option value will be sent as event
    }

}
