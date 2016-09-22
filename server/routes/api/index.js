var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

module.exports = router;
