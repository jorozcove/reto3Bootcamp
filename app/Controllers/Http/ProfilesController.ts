import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
    public async store({request}: HttpContextContract) {
        const profile = new Profile()
        profile.name = request.input('name')
        profile.description = request.input('description')
        await profile.save()
        return {
            "Perfil" : profile,
            "msg" : "Perfil creado satisfactoriamente",
            "estado" : 200
        }
    }

    //json example of store
    // {
    //     "name" : "Admin",
    //     "description" : "Administrador del sistema"
    // }


    public async index() {
        const profiles = await Profile.all()
        return profiles
    }

    public async show({params}: HttpContextContract) {
        try{
            const profile = await Profile.find(params.id)
            if(profile){
                return profile
            }else{
                return("registro no existe")
            }
        }catch (error) {
            console.log(error)
        }
    }

    public async update({request, params}: HttpContextContract) {
        const profile = await Profile.find(params.id)
        if(profile){
            profile.name = request.input('name')
            profile.description = request.input('description')
            if(await profile.save()){
                return {
                    "Perfil" : profile,
                    "msg" : "Perfil actualizado satisfactoriamente",
                }          
            }
            return({    
                "msg" : "Perfil no actualizado",
                "estado" : 401
            })
        }else{
            return({
                "msg" : "Perfil no existe",
                "estado" : 401
            })
        }
    }

    public async destroy({params}: HttpContextContract) {
        const profile = await Profile.find(params.id)
        if(profile){
            await profile.delete()
            return({
                "msg" : "Perfil eliminado satisfactoriamente",
                "estado" : 200
            })
        }else{
            return({
                "msg" : "Perfil no existe",
                "estado" : 401
            })
        }
    }
}
