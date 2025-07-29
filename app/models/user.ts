import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Question from '#models/question'
import Answer from '#models/answer'
import Comment from '#models/comment'
import Vote from '#models/vote'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare email: string

  @column()
  declare name: string | null

  @column()
  declare avatar: string | null

  @column()
  declare provider: string

  @column({ columnName: 'provider_id' })
  declare providerId: string

  @column()
  declare role: string

  @column()
  declare rank: number

  @column()
  declare points: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @hasMany(() => Question)
  declare questions: HasMany<typeof Question>

  @hasMany(() => Answer)
  declare answers: HasMany<typeof Answer>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>

  @beforeCreate()
  static async generateUuid(user: User) {
    if (!user.id) {
      user.id = randomUUID()
    }
  }
}
