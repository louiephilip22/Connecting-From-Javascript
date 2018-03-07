const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'development',
    password : 'development',
    database : 'vagrant'
  }
});

knex.select().from('famous_people').asCallback((err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    knex.destroy(() => {
      console.log('connection terminated');
    });
});
