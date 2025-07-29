import type { HttpContext } from '@adonisjs/core/http'
import Question from '#models/question'
import { createQuestionValidator, updateQuestionValidator } from '#validators/question'
import string from '@adonisjs/core/helpers/string'

export default class QuestionsController {
  /**
   * Display a list of resource
   */
  async index({ user }: HttpContext) {
    const questions = await Question.query()
      .where('userId', user.id)
      .preload('user')
      .orderBy('createdAt', 'desc')
      .paginate(1, 10)

    return questions
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, user }: HttpContext) {
    const data = request.all()
    const payload = await createQuestionValidator.validate(data)
    const question = await Question.create({
      ...payload,
      userId: user.id,
      slug: string.slug(`${payload.name}-${Date.now()}`),
    })
    return question
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const question = await Question.query().where('slug', params.id).preload('user').firstOrFail()
    return question
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, user }: HttpContext) {
    const question = await Question.query().where('slug', params.id).firstOrFail()
    const data = request.all()
    const payload = await updateQuestionValidator.validate(data)
    return { payload, question, user }
  }

  /**
   * Delete record
   */
  async destroy({ params, user }: HttpContext) {
    const question = await Question.query().where('slug', params.id).firstOrFail()
    await question.delete()
    return { question, user }
  }
}
