var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

// much more concise declaration
function User(user) {
    this.username = user;
}

// You need to assign a new function here
User.prototype.generateJWT  = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };
  User.prototype.toAuthJSON = function(){
    return {
      username: this.username,
      email: 'rafael.wt@gmail.com',
      token: this.generateJWT(),
      bio: 'developer',
      image: 'sin foto'
    };
  };
  

// no need to overwrite `exports` ... since you're replacing `module.exports` itself
module.exports = User;