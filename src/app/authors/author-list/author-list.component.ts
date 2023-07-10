import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, OnDestroy{
  @Output() selectedAuthorEvent  = new EventEmitter<Author>();
  authors: Author[] = [];
  id: Number = 0;
  term: string = "";

  private subscription: Subscription;
  constructor(private authorService: AuthorService
              )
  
  {

  }

  ngOnInit(): void {
      this.authors = this.authorService.getAuthors();
      this.authors = this.authorService.getAuthors();
      this.subscription = this.authorService.authorListChangedEvent.subscribe(
          (authorsList: Author[]) => {
              this.authors = authorsList;
          }
      )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
    
    }
  
}
