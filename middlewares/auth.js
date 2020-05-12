module.exports = {
  isLoged: (req, res, next) => {
    let notLoged = (req.session.usuario == undefined);
    if (notLoged) {
      res.redirect('/');
    }
    next();
  }
};