var express = require('express');
var wallpaper = require('../controllers/wallpaper.action');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/wallpaper/latest', wallpaper.latest);
router.get('/wallpaper/search', wallpaper.search);
router.get('/wallpaper/:tag', wallpaper.tag);
router.get('/wallpaper/save', wallpaper.save);
module.exports = router;
