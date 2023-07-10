import { Component } from '@angular/core';
import { Author } from './author.model'

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  // selectedAuthor: Author = {};

  ngOnInit(): void {
    
  }

  constructor() {}
}
