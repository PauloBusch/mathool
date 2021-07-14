const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();
  
  const rawToken = req.headers['authorization'];
  if (!rawToken) return res.status(403).send({ errors: ['No token provied'] });

  const [ _, token ] = rawToken.split(' ');
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if(err) {
      res.status(403).send({ errors: ['Failed to authenticate token', err.message] });
      throw err;
    }

    req.user = decoded.user;
    next();
  });
}
