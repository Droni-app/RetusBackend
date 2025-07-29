import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'parent_id' })
  declare parentId: string | null

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare icon: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Self-referencing relationships for parent/child categories
  @belongsTo(() => Category, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof Category>

  @hasMany(() => Category, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof Category>

  @beforeCreate()
  static async generateUuid(category: Category) {
    if (!category.id) {
      category.id = randomUUID()
    }
  }
}
