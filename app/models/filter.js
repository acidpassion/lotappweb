var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FilterSchema   = new Schema({
    startHostFrom: String,
    startHostTo: String,
    startPanko: String,
    startGuestFrom: String,
    startGuestTo: String,
    nowHostFrom: String,
    nowHostTo: String,
    nowPanko: String,
    nowGuestFrom: String,
    nowGuestTo: String,
    endHostFrom: String,
    endHostTo: String,
    endPanko: String,
    endGuestFrom: String,
    endGuestTo: String,
    euroAsiaHostFrom: String,
    euroAsiaHostTo: String,
    euroAsiaPanko: String,
    euroAsiaGuestFrom: String,
    euroAsiaGuestTo: String
});

module.exports = mongoose.model('Filter', FilterSchema);


