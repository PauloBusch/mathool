function errorMidware(req, res, next) {
  const bundle = res.locals.bundle;
  if (bundle.errors){
    const errors = parseErrors(bundle.errors);
    return res.status(500).json({ errors });
  }
  next();
};

const parseErrors = nodeRestfulErrors => {
  const errors = [];
  for (let error in nodeRestfulErrors)
    errors.push(nodeRestfulErrors[error].message);
  return errors;
}

module.exports = { errorMidware };
