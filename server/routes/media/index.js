var router = require('express').Router();
var envVar = require('../../env');
var s3Proxy = require('s3-proxy');

router.get('/*', s3Proxy({
  bucket: 'ionic-aframe-development',
  accessKeyId: envVar.AWS.accessKeyId,
  secretAccessKey: envVar.AWS.secretAccessKey,
  overrideCacheControl: 'max-age=100000'
}));

module.exports = router;
