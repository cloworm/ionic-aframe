var router = require('express').Router();
var models = require('../../models');

router.get('/', function(req, res, next) {
  models.Post.findAll()
  .then(function(posts) {
    res.send(posts);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  models.Post.create(req.body)
  .then(function(post) {
    res.send(post);
  })
  .catch(next);
});

router.post('/:id/likes', function(req, res, next) {
  models.Like.create({
    PostId: req.params.id,
    UserId: req.body.userId
  })
  .then(function(like) {
    res.send(like);
  })
  .catch(next);
});

router.delete('/:id/likes', function(req, res, next) {
  models.Like.findOne({
    where: {
      PostId: req.params.id,
      UserId: req.body.userId
    }
  })
  .then(function(like) {
    return like.destroy();
  })
  .then(function(response) {
    res.send(response);
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  models.Post.findById(req.params.id)
  .then(function(post) {
    res.send(post);
  })
  .catch(next);
});

router.put('/:id', function(req, res, next) {
  models.Post.findById(req.params.id)
  .then(function(post) {
    return post.update(req.body);
  })
  .then(function(updatedPost) {
    res.send(updatedPost);
  })
  .catch(next);
});


router.delete('/:id', function(req, res, next) {
  models.Post.findById(req.params.id)
  .then(function(post) {
    return post.destroy();
  })
  .then(function(response) {
    res.send(response);
  })
  .catch(next);
})

module.exports = router;
