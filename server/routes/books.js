var express = require('express');
var router = express.Router();
const Book = require('../models/books');
const { ObjectId } = require('mongodb');

module.exports = router; 

let books = [];
let book = null;

// GET BOOKS
//
router.get('/', (req, res, next) => {

    Book.find()
    .populate("author")
    .then(books => {
        this.books = books;
        res.status(200).json({
            message: "books fetched",
            books: books
        })
    })
        .catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        });
}
);


// GET BOOK
router.get('/:id', (req, res, next) => {

    Book.findOne({id: +req.params.id})
    .populate("author")
    .then((book) => {
        this.book = book;
        res.status(200).json({
            message: "book fetched",
            book: book
        })
    })
        .catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        });
}
);

// POST BOOK
// 
router.post('/', (req, res, next) => {

    const book = new Book({
        id: req.body.id,
        title: req.body.title,
        series: req.body.series,
        year: req.body.year,
        subTitle: req.body.subTitle,
        imageUrl: req.body.imageUrl,
        author: new ObjectId(req.body.author['_id'])
          });

    book.save()
        .then(createdBook => {
            res.status(201).json({
                message: 'Book added successfully',
                book: createdBook
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});


// PUT BOOK
//
router.put('/:id', (req, res, next) => {

    Book.findOne({ id: +req.params.id })
        .then(book =>  {
            
            book.title = req.body.title;
            book.series = req.body.series;
            book.year = req.body.year;
            book.subTitle = req.body.subTitle;
            book.imageUrl = req.body.imageUrl;
            book.author = new ObjectId(req.body.author["_id"]);
            
            Book.updateOne({ id: +req.params.id }, book)
                .then(result => {
                    res.status(204).json({
                        message: 'Book updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
            })
        });

// DELETE BOOK
//
router.delete("/:id", (req, res, next) => {
    Book.findOne({id: +req.params.id})
      .then(book => {
        Book.deleteOne({ id: +req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Book deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Book not found.',
          error: { book: 'Book not found'}
        });
      });
  });