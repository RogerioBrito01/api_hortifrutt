import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      //ligar uma tabela a outra 
      table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("name",255).notNullable;
      table.string("telefone",15).nullable();
      table.timestamp("updated_at").nullable();
     
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
