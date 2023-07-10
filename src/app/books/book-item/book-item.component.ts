import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Book } from '../book.model'

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit{
  @Input() book: Book;
  @Output() bookSelected = new EventEmitter<void>();
  

  constructor() {}

  onSelected() {
    this.bookSelected.emit();
  }

  ngOnInit(): void {
  }
}
