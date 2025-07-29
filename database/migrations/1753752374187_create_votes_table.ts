import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'votes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('question_id').nullable().references('id').inTable('questions').onDelete('CASCADE')
      table.uuid('comment_id').nullable().references('id').inTable('comments').onDelete('CASCADE')
      table.tinyint('value').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      // Unique constraints
      table.unique(['user_id', 'question_id'], { indexName: 'unique_user_question_vote' })
      table.unique(['user_id', 'comment_id'], { indexName: 'unique_user_comment_vote' })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
