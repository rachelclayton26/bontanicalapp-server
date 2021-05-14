const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

const validateJWTAdmin = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    const { authorization } = req.headers;
    const payload = authorization ? jwt.verify(authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization, process.env.JWT_SECRET) : undefined;
    if (payload) {
      console.log(payload)
      console.log(payload.id)
      UserModel.findOne({
        where: {
          id: payload.id
        }
      })
        .then(user => {
          console.log(user.isAdmin)
          req.user = user;
          if (user.isAdmin === true) {
            next();
          } else {
            res.status(401).json({
              message: 'Not an admin'
            })
          }
        }).catch(err => {
          console.error(err)
          next()
        });
    } else {
      res.status(401).json({
        message: 'Not allowed'
      });
    }
  } else {
    res.status(401).json({
      message: 'Not allowed 2'
    });
  }
}


module.exports = validateJWTAdmin;