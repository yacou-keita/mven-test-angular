
// Middleware for catch on request
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };

};