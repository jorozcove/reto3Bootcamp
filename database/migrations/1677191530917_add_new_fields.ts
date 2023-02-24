import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('editorial').notNullable()
      table.string('format').notNullable()
      table.integer('pages').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
    })
  }
}
