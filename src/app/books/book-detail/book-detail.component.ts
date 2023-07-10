import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {
  book: Book;
  id: Number;

  constructor(private bookService: BookService, 
            private activatedRoute:  ActivatedRoute,
            private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.book = this.bookService.getBook(this.id)
      }
    )
    
  }

  onDelete() {
    this.bookService.deleteBook(this.book);
    this.router.navigate(['/books']);
  }

}
