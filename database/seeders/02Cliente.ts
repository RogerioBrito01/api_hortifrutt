import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cliente from 'App/Models/Cliente'
import User from 'App/Models/User'


export default class clientesSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const user  = await User.create({
      email:"Cliente@email.com",
      password: "123456",
      tipo: "cliente",
    })
    await Cliente.create({
      name:"Cliente",
      telefone:"63 99999-9999",
      userId: user.id,
    })

  }
}
