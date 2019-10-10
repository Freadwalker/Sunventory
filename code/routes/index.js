const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  if(!req.session.currentUser){
  res.render('index', { title: 'SunvenTory - Restaurant Management' });
  }else{
    res.redirect("/inventory")
  }
});

module.exports = router;
