var router = require('express').Router();
var models = require('../../models');

router.get('/', function(req, res, next) {
  models.User.findAll()
  .then(function(users) {
    res.send(users);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  models.User.create(req.body)
  .then(function(user) {
    res.send(user);
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  models.User.findById(req.params.id)
  .then(function(user) {
    res.send(user);
  })
  .catch(next);
});

router.put('/:id', function(req, res, next) {
  models.User.findById(req.params.id)
  .then(function(user) {
    return user.update(req.body);
  })
  .then(function(updatedUser) {
    res.send(updatedUser);
  })
  .catch(next);
});

router.delete('/:id', function(req, res, next) {
  models.User.findById(req.params.id)
  .then(function(user) {
    return user.destroy();
  })
  .then(function(response) {
    res.send(response);
  })
  .catch(next);
});

router.get('/:id/posts', function(req, res, next) {
  models.Post.findAll({
    where: {
      UserId: req.params.id
    }
  })
  .then(function(posts) {
    res.send(posts);
  })
  .catch(next);
});

module.exports = router;
