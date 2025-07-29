import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Question from '#models/question'
import User from '#models/user'
import Vote from '#models/vote'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'parent_id' })
  declare parentId: string

  @column({ columnName: 'question_id' })
  declare questionId: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column()
  declare content: string

  @column()
  declare rank: number

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => Question)
  declare question: BelongsTo<typeof Question>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Self-referencing relationships for parent/child comments
  @belongsTo(() => Comment, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof Comment>

  @hasMany(() => Comment, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof Comment>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>

  @beforeCreate()
  static async generateUuid(comment: Comment) {
    if (!comment.id) {
      comment.id = randomUUID()
    }
  }
}
