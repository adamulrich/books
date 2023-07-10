import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { BookItemComponent } from './books/book-item/book-item.component';
import { BooksFilterPipe } from './books/books-filter.pipe';
import { AuthorItemComponent } from './authors/author-item/author-item.component';
import { AuthorsFilterPipe } from './authors/authors-filter.pipe'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksComponent,
    AuthorsComponent,
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorEditComponent,
    BookItemComponent,
    BooksFilterPipe,
    AuthorItemComponent,
    AuthorsFilterPipe
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
