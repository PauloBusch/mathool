module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') return next();

    if (!req.user || roles.indexOf(req.user.role) === -1)
      return res.status(403).send({ errors: ['Action is not authorized'] });

    next();
  }  
}