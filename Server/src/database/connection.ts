import knex from 'knex';
import path from 'path'; 

//Recebe um objeto com as configurações do banco de dados
const connection = knex({
  client: 'sqlite3',   //Qual client vou estar usando
  
  
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite') 
  },
  //Código para evitar o cadastramento com id inexistentes
  pool: {
    afterCreate:(connection: any, done: Function) => {
      connection.run('PRAGMA  foreign_keys = ON', done);
    }
  },

  useNullAsDefault: true
});

export default connection;



