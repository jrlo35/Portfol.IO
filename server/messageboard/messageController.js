var Message = require('../../db/models').Message;


//Add new message to database
module.exports.addPostToDB = function (req, res){

  Message.create({
    leagueId: req.body.leagueId,
    userId: req.body.userId,
    name: req.body.name,
    message: req.body.message
  })
  .then(function (post) {
    res.send({leagueId: post.leagueId, name: post.name, message: post.message})
  })
  .catch(function (err) {
    console.error('Error creating message entry: ', err.message);
    res.end();
  })
};

//retrieve all messages from database
module.exports.getAllPosts = function(req, res){
  Message.findAll({where:{ leagueId: req.body.id }}).then(function (posts) {
    if(!posts) {
      res.send('No posts found.');
    } else {
      res.send(posts);
    }
  })
  .catch(function(err) {
    res.send('Error getting posts:', err);
  });
};