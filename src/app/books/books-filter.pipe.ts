import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.model';

@Pipe({
  name: 'booksFilter'
})
export class BooksFilterPipe implements PipeTransform {


  transform(books: Book[], term: string) { 
    
    let filteredBooks: Book[] =[];  
    if (term && term.length > 0) {
       filteredBooks = books.filter(
          (book:Book) => book.title.toLowerCase().includes(term) || 
                        book.author["name"].toLowerCase().includes(term) ||
                        book.subTitle.toLowerCase().includes(term) ||
                        book.year.toString().includes(term) ||
                        book.series.toString().includes(term)

       );
    }
    if (filteredBooks.length < 1){
       return books;
    }
    return filteredBooks;
 }

}
