const jwt = require('jsonwebtoken')
require('dotenv').config()

const check = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.redirect('/login');
    }
      const data = jwt.verify(token, process.env.JWT_SECRET);
      if(!data)
      {
        res.redirect('/login')
      }
      else 
      {
      return next();
      }
}

module.exports = check ;
  