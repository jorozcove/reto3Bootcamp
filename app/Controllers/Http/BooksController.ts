import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async store({request}: HttpContextContract) {
        const book = new Book()
        book.title = request.input('title')
        book.author = request.input('author')
        book.editorial = request.input('editorial')
        book.format = request.input('format')
        book.pages = request.input('pages')
        book.user_id = request.input('user_id')

        await book.save()
        return {
            "Libro" : book,
            "msg" : "Libro creado satisfactoriamente",
            "estado" : 200
        }
    }
    //example of book to store

    // {
    //     "title": "El señor de los anillos",
    //     "author": 2,
    //     "editorial": "Minotauro",
    //     "format": "Tapa dura",
    //     "pages": 1000,
    //     "user_id": 1
    // }


    public async index() {
        const books = await Book.all()
        return books
    }

    public async show({params}: HttpContextContract) {
        try{
            const book = await Book.find(params.id)
            if(book){
                return book
            }else{
                return("registro no existe")
            }
        }catch (error) {
            console.log(error)
        }
    }

    public async update({request, params}: HttpContextContract) {
        const book = await Book.find(params.id)
        if(book){
            book.title = request.input('title')
            book.author = request.input('author')
            book.editorial = request.input('editorial')
            book.format = request.input('format')
            book.pages = request.input('pages')
            book.user_id = request.input('user_id')

            if(await book.save()){
                return {
                    "Libro" : book,
                    "msg" : "Libro actualizado satisfactoriamente",
                }          
            }
            return({    
                "msg" : "Libro no actualizado",
                "estado" : 401
            })
        }else{
            return({
                "msg" : "Libro no existe",
                "estado" : 401
            })
        }
    }

    public async destroy({params}: HttpContextContract) {
        const book = await Book.find(params.id)
        if(book){
            await book.delete()
            return({
                "msg" : "Libro eliminado satisfactoriamente",
                "estado" : 200
            })
        }else{
            return({
                "msg" : "Libro no existe",
                "estado" : 401
            })
        }
    }
}
