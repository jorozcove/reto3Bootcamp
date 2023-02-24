import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('surname').notNullable()
      table.integer('profile').unsigned().notNullable()
      table.string('document').notNullable().unique()
      table.string('document_type').notNullable()
      table.string('address').notNullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('department').notNullable()
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('surname')
      table.dropColumn('profile')
      table.dropColumn('document')
      table.dropColumn('document_type')
      table.dropColumn('address')
      table.dropColumn('neighborhood')
      table.dropColumn('city')
      table.dropColumn('department')
    })
  }
}
