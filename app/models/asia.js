var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AsiaSchema   = new Schema({
    company: String,
    panko: String,
    startHost: String,
    startPanko: String,
    startGuest: String,
    nowHost: String,
    nowPanko: String,
    nowGuest: String,
    endHost: String,
    endPanko: String,
    endGuest: String,
    euroAsiaHost: String,
    euroAsiaPanko: String,
    euroAsiaGuest: String,
    euroAsiaTotal: Number,
    gameId: String
});

module.exports = mongoose.model('Asia', AsiaSchema);


