import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cidades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string("name").notNullable();
      table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.boolean("ativo").notNullable().defaultTo(true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
