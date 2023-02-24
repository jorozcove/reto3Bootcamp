/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
    Route.post("register", "AuthController.register")
    Route.post("login", "AuthController.login")

    Route.group(() => {
        Route.get("books", "BooksController.index")
        Route.get("books/:id", "BooksController.show")

        Route.group(() => {
            Route.put("books/:id", "BooksController.update")
            Route.post("books", "BooksController.store")
            Route.delete("books/:id", "BooksController.destroy")
        }).middleware("isPublisher") //El middleware tambien acepta usuarios con perfil 1 (admin)

        Route.group(() => {
            Route.get("users", "UsersController.index")
            Route.get("users/:id", "UsersController.show")
            Route.put("users/:id", "UsersController.update")
            Route.post("users", "UsersController.store")
            Route.delete("users/:id", "UsersController.destroy")

            Route.post("profiles", "ProfilesController.store")
            Route.get("profiles", "ProfilesController.index")
            Route.get("profiles/:id", "ProfilesController.show")
            Route.put("profiles/:id", "ProfilesController.update")

        }).middleware("isAdmin")

    }).middleware("auth")

}).prefix("api")
