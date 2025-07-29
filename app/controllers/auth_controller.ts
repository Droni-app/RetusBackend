import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async me({ request }: HttpContext) {
    const allHeaders = request.headers()
    //return ally.use('google').userFromToken(token)
    return allHeaders
  }
}
