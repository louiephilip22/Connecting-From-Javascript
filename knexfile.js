const settings = require('./settings');

module.exports = {
  development: {
    client: 'pg',
    connection: settings
  }
};