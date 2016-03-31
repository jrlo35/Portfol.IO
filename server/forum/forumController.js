var Forum = require('../../db/models').Forum;

//Add topic to forum table
module.exports.addTopic = function (req, res){

  Forum.create({
    title: req.body.title,
    description: req.body.description,
    creatorName: req.body.username,
    creatorId: req.body.userId
  })
  .then(function (topic) {
    res.send({title: topic.title, creatorName: topic.creatorName, description: topic.description})
  })
  .catch(function (err) {
    console.error('Error creating new topic: ', err.message);
    res.end();
  })
};

//retrieve forum topic from forum table
module.exports.getOneTopic = function(req, res){

  Forum.findAll({where: {id: req.body.id}}).then(function (topic) {
    if(!topic) {
      res.send('No topics found.');
    } else {
      res.send(topic);
    }
  })
  .catch(function(err) {
    res.send('Error getting topic:', err);
  });
};

//retrieve all forum topics from forum table to display 
module.exports.getAllTopics = function(req, res){

  Forum.findAll().then(function (topics) {
    if(!topics) {
      res.send('No topics found.');
    } else {
      res.send(topics);
    }
  })
  .catch(function(err) {
    res.send('Error getting topics:', err);
  });
};