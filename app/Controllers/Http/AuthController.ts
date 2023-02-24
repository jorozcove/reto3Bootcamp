import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '10 mins',
            })
            return {
                token,
                "msg" : "Usuario logueado satisfactoriamente"
            }
        }catch (error) {
            return response.unauthorized('Invalid credentials')
        }
    }

    public async register({ request, auth}: HttpContextContract) {
        const name = request.input('name')
        const email = request.input('email')
        const password = request.input('password')
        const surname = request.input('surname')
        const profile = request.input('profile')
        const document = request.input('document')
        const document_type = request.input('document_type')
        const address = request.input('address')
        const neighborhood = request.input('neighborhood')
        const city = request.input('city')
        const department = request.input('department')

        const userExists = await User.findBy('document', document)

        if (!userExists) {

            const user = new User()
            user.name = name
            user.email = email
            user.password = password
            user.surname = surname
            user.profile = profile
            user.document = document
            user.document_type = document_type
            user.address = address
            user.neighborhood = neighborhood
            user.city = city
            user.department = department

            await user.save()

            const token = await auth.use('api').login(user, {
                expiresIn: '30 min',
            })

            return {
                token,
                "msg" : "Usuario registrado satisfactoriamente"
            }
        
        }else{
            return {
                "msg" : "El usuario ya existe"
            }
        }

    }

    //example:

    // {
    //     "name": "usuarioPrueba1",
    //     "email": "prueba1@gmail.com",
    //     "password": "12345",
    //     "surname": "apellidoPrueba1",
    //     "profile": 1,
    //     "document": "123456789",
    //     "document_type": "CC",
    //     "address": "calle 123",
    //     "neighborhood": "barrio prueba",
    //     "city": "bogota",
    //     "department": "cundinamarca"
    // }

    //example 2 with profile 2 (normal user, use dummy data)

    // {
    //     "name": "juan",
    //     "email": "juan@gmail.com",
    //     "password": "12345",
    //     "surname": "perez",
    //     "profile": 2,
    //     "document": "987654",
    //     "document_type": "CC",
    //     "address": "calle 745",
    //     "neighborhood": "barrio villa",
    //     "city": "Cali",
    //     "department": "Cauca"
    // }
        
}
