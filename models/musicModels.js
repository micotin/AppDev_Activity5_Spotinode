const db = require('../config/db');
class MusicModel {
  static fetchQueue(callback) {
    db.query('SELECT * FROM queue', callback);
  }
}
module.exports = MusicModel;
