var express = require('express');
var router = express.Router();
module.exports = router; 

const Author = require('../models/authors');
const { ObjectId } = require('mongodb');
let authors = [];

router.get('/', (req, res, next) => {
    
    Author.find()
    
    .then(authors => {
        this.authors = authors;
        console.log(authors);
        res.status(200).json({
            message: "authors fetched",
            authors: this.authors
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

    const author = new Author({
        name: req.body.name,
        bioUrl: req.body.bioUrl,
        imageUrl: req.body.imageUrl,
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

router.put('/:id', (req, res, next) => {

    Author.findOne({ _id: req.params.id })
        
        .then(author => {
            name = req.body.name,
            bioUrl = req.body.bioUrl,
            imageUrl = req.body.imageUrl
            })            

            Author.updateOne({ _id: req.params.id }, author)
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
        // .catch(error => {
        //     res.status(500).json({
        //         message: 'Author not found.',
        //         error: { author: 'Author not found' }
        //     });
        // });

router.delete("/:id", (req, res, next) => {
    Author.findOne({ _id: req.params.id })
      .then(author => {
        Author.deleteOne({ _id: req.params.id })
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