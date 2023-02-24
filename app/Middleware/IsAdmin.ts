import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const user = auth.user!
      if (user.profile === 1) {
        await next()
      } else {
        return response.forbidden({ error: 'Unauthorized access' })
      }
    } catch (error) {
      return response.forbidden({ error: 'Server error' })
    }
  }
}