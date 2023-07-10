import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Author } from './author.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

// AUTHOR SERVICE
//
export class AuthorService implements OnInit {

    authors: Author[] = [];
    authorListChangedEvent = new Subject<Author[]>();
    maxAuthorId: number = 0;

    urlExpress: string = "http://127.0.0.1:3000/authors";

    // on init
    //
    ngOnInit(): void {
        this.authors = this.getAuthors();
    }

    // constructor
    // using injection
    //
    constructor(
        private httpClient: HttpClient) { }

    //
    // GET all authors
    //
    getAuthors(): any {
        this.httpClient.get<{ message: String, authors: Author[] }>(this.urlExpress).subscribe(

            // success method

            (responseData) => {
                this.authors = responseData.authors;
                this.maxAuthorId = this.getMaxId();

                // sort the list of authors
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
    // GET an author
    //
    //
    getAuthor(id: Number) {
        return this.authors.find(author => author.id == id);
    }

    //
    // UPDATE an author (using put)
    //
    //
    updateAuthor(originalAuthor: Author, newAuthor: Author) {
        if (!originalAuthor || !newAuthor) {
            return;
        }

        const pos = this.authors.findIndex(d => d.id === originalAuthor.id);

        if (pos < 0) {
            return;
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // update database
        this.httpClient.put(this.urlExpress + '/' + originalAuthor.id,
            newAuthor, { headers: headers })
            .subscribe(
                () => {
                    this.authors[pos] = newAuthor;
                    this.sortAndSend();
                }
            );
    }

    
    // ADD an author (using post)
    //    
    addAuthor(author: Author) {
        if (!author) {
            return;
        }

        // make sure id of the new Author is empty
        author.id = this.getMaxId() + 1;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // add to database
        this.httpClient.post<{ message: string, author: Author }>(this.urlExpress,
            author,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    // add new author to authors
                    this.authors.push(responseData.author);
                    this.sortAndSend();
                }
            );
    }

    //
    // get maxId from data
    // helper function for creating new authors
    //
    getMaxId(): number {
        return Math.max(...this.authors.map(d => +d.id), 0)
    }

    //
    // DELETE an author
    //    
    deleteAuthor(author: Author) {

        if (!author) {
            return;
        }

        const pos = this.authors.findIndex(d => d.id === author.id);

        if (pos < 0) {
            return;
        }

        // delete from database
        this.httpClient.delete(this.urlExpress + '/' + author.id)
            .subscribe(
                () => {
                    this.authors.splice(pos, 1);
                    this.sortAndSend();
                }
            );
    }

    //
    // Sort Authors and return list
    //
    //
    sortAndSend() {
        var authorsListClone = this.authors.slice();
        authorsListClone.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 0);
        // emit the next contact list change event
        this.authorListChangedEvent.next(authorsListClone)
        this.authors = authorsListClone;
        return authorsListClone
    }

}
