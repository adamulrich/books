var express = require('express');
var router = express.Router();
module.exports = router; 
const mongoose = require('mongoose');
const sequenceGenerator = require('./sequenceGenerator');

const Book = require('../models/books');
let books = [];
let book = null;


router.get('/', (req, res, next) => {

    console.log("here");
    Book.find()
    .populate("author")
    .then(books => {
        this.books = books;
        console.log(books);
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

router.get('/:id', (req, res, next) => {

    console.log(req.params.id);
    //Book.findById(req.params.id)
    Book.findOne({id: +req.params.id})
    .populate("author")
    .then((book) => {
        console.log(book);
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


router.post('/', (req, res, next) => {
    const maxBookId = sequenceGenerator.nextId("books");

    const book = new Book({
        id: maxBookId,
        title: req.body.title,
        series: req.body.series,
        year: req.body.year,
        subTitle: req.body.subTitle,
        imageUrl: req.body.imageUrl,
        author: new ObjectId(req.body.author)
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

router.put('/:id', (req, res, next) => {

    
    Book.findOne({ _id: req.params.id })
        .populate("author")
        .then(book => {
            title= req.body.title,
            id = req.body.id,
            series= req.body.series,
            year = req.body.year,
            subTitle = req.body.subTitle,
            imageUrl = req.body.imageUrl,
            author = new ObjectId(req.body.author)})          

            Book.updateOne({ _id: req.params.id }, book)
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
        });

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