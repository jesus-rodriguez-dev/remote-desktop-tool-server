module.exports = function (req, res, next){
  if (!req.originalUrl.includes("dashboard")) return next();

  if (req.session.logged) return next();

  res.redirect('/login'); 
};