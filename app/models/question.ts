import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  hasMany,
  beforeCreate,
  manyToMany,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import Answer from '#models/answer'
import Comment from '#models/comment'
import Vote from '#models/vote'
import Category from '#models/category'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare content: string

  @column({ columnName: 'response_1' })
  declare response1: string

  @column({ columnName: 'response_2' })
  declare response2: string

  @column({ columnName: 'response_3' })
  declare response3: string

  @column({ columnName: 'response_4' })
  declare response4: string

  @column()
  declare correct: number

  @column()
  declare time: number

  @column()
  declare picture: string | null

  @column({
    consume: (value: string) => JSON.parse(value),
    prepare: (value: any) => JSON.stringify(value),
  })
  declare tags: any

  @column()
  declare rank: number

  @column()
  declare level: number

  @column()
  declare saber: boolean

  @column()
  declare approvedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Answer)
  declare answers: HasMany<typeof Answer>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>

  @manyToMany(() => Category)
  declare categories: ManyToMany<typeof Category>

  @beforeCreate()
  static async generateUuid(question: Question) {
    if (!question.id) {
      question.id = randomUUID()
    }
  }
}
