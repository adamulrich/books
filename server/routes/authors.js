var express = require('express');
var router = express.Router();
const Author = require('../models/authors');
const { ObjectId } = require('mongodb');

module.exports = router; 

let authors = [];
let author = null;

// GET AUTHORS
//
router.get('/', (req, res, next) => {

    Author.find()
    .then(authors => {
        this.authors = authors;
        res.status(200).json({
            message: "authors fetched",
            authors: authors
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


// GET AUTHOR
router.get('/:id', (req, res, next) => {

    Author.findOne({id: +req.params.id})
    .then((author) => {
        this.author = author;
        res.status(200).json({
            message: "author fetched",
            author: author
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

// POST AUTHOR
// 
router.post('/', (req, res, next) => {

    const author = new Author({
        id: req.body.id,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        bioUrl: req.body.bioUrl
          });

    author.save()
        .then(createdAuthor => {
            res.status(201).json({
                message: 'Author added successfully',
                author: createdAuthor
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});


// PUT AUTHOR
//
router.put('/:id', (req, res, next) => {

    Author.findOne({ id: +req.params.id })
        .then(author =>  {
            
            author.id = req.body.id;
            author.name = req.body.name;
            author.imageUrl = req.body.imageUrl;
            author.bioUrl = req.body.bioUrl;
            
            Author.updateOne({ id: +req.params.id }, author)
                .then(result => {
                    res.status(204).json({
                        message: 'Author updated successfully'
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

// DELETE AUTHOR
//
router.delete("/:id", (req, res, next) => {
    Author.findOne({id: +req.params.id})
      .then(author => {
        Author.deleteOne({ id: +req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Author deleted successfully"
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
          message: 'Author not found.',
          error: { author: 'Author not found'}
        });
      });
  });