var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET /about */
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    content: `We are the #1 Canada's Real Estate Website`,
    user: req.user
  })
})

module.exports = router;
