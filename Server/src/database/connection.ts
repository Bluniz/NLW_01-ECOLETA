import knex from 'knex';
import path from 'path'; 

//Recebe um objeto com as configurações do banco de dados
const connection = knex({
  client: 'sqlite3',   //Qual client vou estar usando
  
  
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite') 
  },

  useNullAsDefault: true
});

export default connection;



