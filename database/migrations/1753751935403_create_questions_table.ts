import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('name', 255).notNullable()
      table.string('slug', 255).unique().notNullable()
      table.text('content').notNullable()
      table.string('response_1', 255).notNullable()
      table.string('response_2', 255).notNullable()
      table.string('response_3', 255).notNullable()
      table.string('response_4', 255).notNullable()
      table.tinyint('correct').notNullable()
      table.integer('time').unsigned().defaultTo(5).notNullable()
      table.string('picture', 255).nullable()
      table.json('tags').notNullable()
      table.decimal('rank', 5, 2).notNullable()
      table.decimal('level', 5, 2).notNullable()
      table.boolean('saber').defaultTo(false).notNullable()
      table.datetime('approved_at').nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
