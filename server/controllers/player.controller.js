const {Player} = require('../models/player.model');

module.exports.createPlayer = (request,response) => {
    const {name, preferredPosition, status} = request.body;
    Player.create({
        name,
        preferredPosition,
        game1:"undecided",
        game2:"undecided",
        game3:"undecided"
    })
    .then(player => response.json(player))
    .catch(err => response.status(400).json(err));
}

module.exports.getAllPlayers = (request, response) => {
    Player.find({})
    .then(players => response.json(players))
    .catch(err => response.json(err))
}

module.exports.getPlayer = (request, response) => {
    Player.findOne({_id: request.params.id})
    .then(player => response.json(player))
    .catch(err => response.json(err))
}

module.exports.updatePlayer = (request, response) => {
    Player.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
    .then(updatedPlayer => response.json(updatedPlayer))
    .catch(err => response.status(400).json(err))
}

module.exports.deletePlayer = (request, response) => {
    Player.deleteOne({_id: request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json(err));
}