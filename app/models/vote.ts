import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Question from '#models/question'
import Comment from '#models/comment'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column({ columnName: 'question_id' })
  declare questionId: string | null

  @column({ columnName: 'comment_id' })
  declare commentId: string | null

  @column()
  declare value: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Question)
  declare question: BelongsTo<typeof Question>

  @belongsTo(() => Comment)
  declare comment: BelongsTo<typeof Comment>

  @beforeCreate()
  static async generateUuid(vote: Vote) {
    if (!vote.id) {
      vote.id = randomUUID()
    }
  }
}
