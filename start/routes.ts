

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'


Route.get('/', async () => {
 User.create({
  email:'admin@gmail.com',
  password: '123123',
  tipo: "admin"
 });
})
