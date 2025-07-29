import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Question from '#models/question'
import User from '#models/user'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'question_id' })
  declare questionId: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column()
  declare response: string

  @column()
  declare correct: boolean

  @column()
  declare time: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => Question)
  declare question: BelongsTo<typeof Question>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  static async generateUuid(answer: Answer) {
    if (!answer.id) {
      answer.id = randomUUID()
    }
  }
}
