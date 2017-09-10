var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema   = new Schema({
    date : String,
    type : String,
    time : String,
    time_elapsed : String,
    host : String,
    guest : String,
    index1 : String,
    pankou : String,
    index2 : String,
    id : String
});

module.exports = mongoose.model('Game', GameSchema);


