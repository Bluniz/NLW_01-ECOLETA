import path from 'path';

module.exports = {
 client: 'sqlite3',
 connection: {
  filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
},
//Pasta onde vão estar nossas migrations
migrations: {
  directory: path.resolve(__dirname, 'src', 'database', 'migrations')
},
//Pasta onde vão estar nossas seeds
seeds: {
  directory: path.resolve(__dirname, 'src', 'database', 'seeds')
},
useNullAsDefault: true,
};