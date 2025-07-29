import type { HttpContext } from '@adonisjs/core/http'
import Question from '#models/question'
import { createQuestionValidator, updateQuestionValidator } from '#validators/question'

export default class QuestionsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const questions = await Question.query()
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
    return { payload, user }
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
