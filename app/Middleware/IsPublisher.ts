import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsPublisher {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const user = auth.user!
      if (user.profile === 2 || user.profile === 1) {
        console.log(user.profile === 2 || user.profile === 1)
        await next()
      } else {
        return response.forbidden({ error: 'Unauthorized access' })
      }
    } catch (error) {
      //Print traceback
      console.log(error)
      return response.forbidden({ error: 'Server error' })
    }
  }
}
