import { Component, Input, OnInit } from '@angular/core';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})

export class AuthorDetailComponent implements OnInit {
  author: Author;
  id: Number;

  constructor(private authorService: AuthorService, 
            private activatedRoute:  ActivatedRoute,
            private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.author = this.authorService.getAuthor(this.id)
      }
    )
    
  }

  onDelete() {
    this.authorService.deleteAuthor(this.author);
    this.router.navigate(['/authors']);
  }

}
