module.exports = {
  isLoged: async (req, res, next) => {
    notLoged = (req.session.usuario == undefined);
    if (notLoged) {
      res.redirect('/');
    }
    next();
  }
};