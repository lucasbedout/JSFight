// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var messageSchema = mongoose.Schema({

    sender: String,
    content: String,
    created_at: Date

});

// Create timestamp
messageSchema.pre('save', function(next){
    var now = new Date();
    this.created_at = now;
    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Message', messageSchema);