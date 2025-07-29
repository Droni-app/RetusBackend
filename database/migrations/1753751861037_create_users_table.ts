import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('email', 255).unique().notNullable()
      table.string('name', 255).nullable()
      table.text('avatar').nullable()
      table.string('provider', 50).notNullable()
      table.string('provider_id', 255).notNullable()
      table.unique(['provider', 'provider_id'])
      table.string('role', 50).defaultTo('user')
      table.decimal('rank', 5, 2).defaultTo(0.0)
      table.integer('points').defaultTo(0)

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
