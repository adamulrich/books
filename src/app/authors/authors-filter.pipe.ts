import { Pipe, PipeTransform } from '@angular/core';
import { Author } from './author.model';

@Pipe({
  name: 'authorsFilter'
})
export class AuthorsFilterPipe implements PipeTransform {


  transform(authors: Author[], term: string) { 
    
    let filteredAuthors: Author[] =[];  
    if (term && term.length > 0) {
       filteredAuthors = authors.filter(
          (author:Author) => author.name.toLowerCase().includes(term) 

       );
       return filteredAuthors;
    } else {
      return authors;
    }
 }

}
