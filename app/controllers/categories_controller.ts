import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const cvategories = await Category.query()
      .whereNull('parent_id')
      .preload('children', (query) => {
        query
          .preload('children', (childQuery) => {
            childQuery.orderBy('name', 'asc')
          })
          .orderBy('name', 'asc')
      })
      .orderBy('name', 'asc')

    return cvategories
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const category = await Category.query()
      .where('slug', params.id)
      .preload('parent')
      .preload('children', (query) => {
        query.orderBy('name', 'asc')
      })
      .firstOrFail()

    return category
  }
}
