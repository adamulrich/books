import { Routes, RouterModule  } from "@angular/router";
import { NgModule}  from '@angular/core';
import { BooksComponent } from "./books/books.component";
import { BookEditComponent } from "./books/book-edit/book-edit.component";
import { BookDetailComponent } from "./books/book-detail/book-detail.component";
import { AuthorsComponent } from "./authors/authors.component";
import { AuthorEditComponent } from "./authors/author-edit/author-edit.component";
import { AuthorDetailComponent } from "./authors/author-detail/author-detail.component";

const appRoutes: Routes = [
{path: '', redirectTo: "/books", pathMatch: 'full'},
{path: 'books', component: BooksComponent, children: 
    [
        {path: 'new', component: BookEditComponent},
        {path: ':id', component: BookDetailComponent},
        {path: ':id/edit', component: BookEditComponent},
    ]
},

{path: 'authors', component: AuthorsComponent, children: 
    [
        { path: 'new', component: AuthorEditComponent },
        { path: ':id', component: AuthorDetailComponent },
        { path: ':id/edit', component: AuthorEditComponent}
    ]}
];

@NgModule(
    {
        imports: [RouterModule.forRoot(appRoutes)],
        exports: [RouterModule]
    }
)

export class AppRoutingModule {

}
