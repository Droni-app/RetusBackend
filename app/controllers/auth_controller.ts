import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async me({ user }: HttpContext) {
    return user
  }
}
