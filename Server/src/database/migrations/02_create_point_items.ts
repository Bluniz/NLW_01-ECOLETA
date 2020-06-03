import Knex from 'knex';


export async function up(knex: Knex){
  return knex.schema.createTable('point_items', table => {
   table.increments('id').primary();

   //Todo id dessa tabela precisa ser um id valido  dentro da tabela points
   table.integer('point_id')
   .notNullable()
   .references('id')
   .inTable('points');

   table.integer('item_id')
   .notNullable;
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items');
}