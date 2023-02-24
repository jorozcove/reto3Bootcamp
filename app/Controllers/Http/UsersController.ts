import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async index() {
        const users = await User.all()
        return users
    }

    public async show({params}: HttpContextContract) {
        try{
            const user = await User.find(params.document)
            if(user){
                return user
            }else{
                return("registro no existe")
            }
        }catch (error) {
            console.log(error)
        }
    }

    public async update({request, params}: HttpContextContract) {
        const user = await User.find(params.document)
        if(user){
            user.name = request.input('name')
            user.email = request.input('email')
            user.password = request.input('password')
            user.surname = request.input('surname')
            user.profile = request.input('profile')
            user.document = request.input('document')
            user.document_type = request.input('document_type')
            user.address = request.input('address')
            user.neighborhood = request.input('neighborhood')
            user.city = request.input('city')
            user.department = request.input('department')
            if(await user.save()){
                return {
                    "Usuario" : user,
                    "msg" : "Usuario actualizado satisfactoriamente",
                }          
            }
            return({    
                "msg" : "Usuario no actualizado",
                "estado" : 401
            })
        }else{
            return({
                "msg" : "Usuario no existe",
                "estado" : 401
            })
        }
    }

    public async destroy({params}: HttpContextContract) {
        const user = await User.find(params.document)
        if(user){
            await user.delete()
            return({
                "msg" : "Usuario eliminado satisfactoriamente",
                "estado" : 200
            })
        }else{
            return({
                "msg" : "Usuario no existe",
                "estado" : 401
            })
        }
    }
}
