import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthorService } from 'src/app/authors/author.service';
import { Author } from 'src/app/authors/author.model';

@Component({
    selector: 'app-author-edit',
    templateUrl: './author-edit.component.html',
    styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit, OnDestroy {
    originalAuthor: Author;
    author: Author = {
        id: 0,
        name: "",
        bioUrl: "",
        imageUrl: ""
    };
    editMode: boolean = false;
    id: Number;
    groupAuthors: Author[] = [];
    authors: Author[] = this.authorService.authors;

    @ViewChild('f') authorForm: NgForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authorService: AuthorService
    ) {
        authorService.getAuthors();
    }

    onCancel() {
        this.router.navigate(['/authors']);
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];

                if (this.id == null || this.id == undefined) {
                    this.editMode = false;
                    return
                }
                this.originalAuthor = this.authorService.getAuthor(this.id);

                if (this.originalAuthor == undefined || this.originalAuthor == null) {
                    return
                }
                this.editMode = true;
                this.author = { ...this.originalAuthor };
                console.log(this.author);

            }
        )
    }


    onSubmit(form: NgForm) {

        const value = form.value;
        const author = this.authorService.getAuthor(value.author)
        const newAuthor = new Author(
            value.id,
            value.name,
            value.imageUrl,
            value.bioUrl
        );

        if (this.editMode) {

            this.authorService.updateAuthor(this.originalAuthor, newAuthor)
        } else {
            newAuthor.id = this.authorService.getMaxId();
            this.authorService.addAuthor(newAuthor)
        }

        this.onCancel()
    }

    ngOnDestroy(): void { }

    isInvalidAuthor(newAuthor: Author) {
        if (!newAuthor) {// newAuthor has no value
            return true;
        }
        if (this.author && newAuthor.id === this.author.id) {
            return true;
        }
        for (let i = 0; i < this.groupAuthors.length; i++) {
            if (newAuthor.id === this.groupAuthors[i].id) {
                return true;
            }
        }
        return false;
    }

    addToGroup($event: any) {
        const selectedAuthor: Author = $event.dragData;
        const invalidGroupAuthor = this.isInvalidAuthor(selectedAuthor);
        if (invalidGroupAuthor) {
            console.log('invalid')
            return;
        }
        console.log('pushing' + selectedAuthor.toString())
        this.groupAuthors.push(selectedAuthor);
    }

    onRemoveItem(index: number) {
        if (index < 0 || index >= this.groupAuthors.length) {
            return;
        }
        this.groupAuthors.splice(index, 1);
    }

    authorSelected: any;

    onAuthorSelected($event) {
        console.log($event); //option value will be sent as event
    }

}
