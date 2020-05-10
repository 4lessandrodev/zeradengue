const GenericDao = require('./GenericDao');
class DenunciaDao extends GenericDao {
  constructor (model) {
    super(GenericDao);
    this.Model = model;
  }
}

module.exports = DenunciaDao;