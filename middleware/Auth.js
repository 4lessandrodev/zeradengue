module.exports = {
  
  autenticar: (req, res, next) => {
    const conected = req.session.USER != undefined;
    if (!conected) {
      res.redirect('/login');
    } else {
      next();
    }
  },

  logout: (req, res, next) => {
    req.session.USER = undefined;
    res.redirect('/login');
  }

};