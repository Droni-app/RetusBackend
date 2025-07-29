import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('parent_id').nullable().references('id').inTable('categories').onDelete('CASCADE')
      table.string('name', 255).notNullable()
      table.string('slug', 255).unique().notNullable()
      table.string('icon', 255).notNullable()
      table.text('description').nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
