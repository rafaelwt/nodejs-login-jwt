var router = require('express').Router();
var passport = require('passport');
var auth = require('../auth');
// llamar api http://localhost:3000/api/user
router.get('/user', auth.required , (req, res, next) => {
    res.send({ message : 'prueba login'});
});

router.post('/users/login', function(req, res, next){
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "no puede estas vacio"}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "no puede estas vacio"}});
    }
    // res.send({ user: req.body.user });
    passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){ return next(err); }
    
        if(user){
          user.token = user.generateJWT();
          return res.json({user: user.toAuthJSON()});
        } else {
          return res.status(422).json(info);
        }
      })(req, res, next);
  });

module.exports = router;