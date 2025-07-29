import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = String(ctx.request.header('Authorization')).replace('Bearer ', '')

    try {
      const allyInfo = await ctx.ally.use('google').userFromToken(token)
      console.log('Ally Info:', allyInfo)

      if (!allyInfo) {
        return ctx.response.status(401).send({ error: 'Unauthorized' })
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
    } catch (error) {
      return ctx.response.status(401).send({ error: 'Unauthorized' })
    }

    const output = await next()
    return output
  }
}
