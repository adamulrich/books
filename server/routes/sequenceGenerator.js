var Sequence = require('../models/sequence');

var maxBookId;
var maxAuthorId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .then((sequence) => {
        sequenceId = sequence._id;
        maxBookId = sequence.maxBookId;
        maxAuthorId = sequence.maxAuthorId;
    }).catch(err => {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
    }
    )
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'authors':
      maxAuthorId++;
      updateObject = {maxAuthorId: maxAuthorId};
      nextId = maxAuthorId;
      break;
    case 'books':
      maxBookId++;
      updateObject = {maxBookId: maxBookId};
      nextId = maxBookId;
      break;
   default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
