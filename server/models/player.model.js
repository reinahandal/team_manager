const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Player name is required"],
        minlength:[2, "Name must be at least 2 characters in length"]
    },
    preferredPosition:{type:String},
    game1 :{type:String},
    game2 :{type:String},
    game3 :{type:String}
}, {timestamps:true});

module.exports.Player = mongoose.model('Player', PlayerSchema);