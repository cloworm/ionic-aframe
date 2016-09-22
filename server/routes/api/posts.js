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
