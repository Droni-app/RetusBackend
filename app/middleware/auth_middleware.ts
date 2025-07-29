import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const token = String(ctx.request.header('Authorization')).replace('Bearer ', '')
    const allyInfo = await ctx.ally.use('google').userFromToken(token)
    console.log('Ally Info:', allyInfo)

    if (!allyInfo) {
      ctx.response.status(401).send({ error: 'Unauthorized' })
      return
    }
    const user = await User.firstOrCreate(
      { providerId: allyInfo.id, provider: 'google' },
      {
        email: allyInfo.email,
        name: allyInfo.name,
        avatar: allyInfo.avatarUrl,
        role: 'user',
        rank: 0,
        points: 0,
      }
    )
    console.log('Authenticated User:', user)
    ctx.auth.user = user
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
