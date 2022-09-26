import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estabelecimento from 'App/Models/Estabelecimento';
import User from 'App/Models/User'

export default class EstabelecimentoSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const user = await User.create({
      email:"estabelecimento@gmail.com",
      password: "123456",
      tipo:"estabelecimento",
    });
    await Estabelecimento.create({
        name: "Estabelecimento",
        logo: "https://webevolui.com.br/principal/imagem/web-evolui-logo.png",
        online: true,
        bloqueado:true,
        userId: user.id,

      })
      await Estabelecimento.create({
        name:"Estabelecimento",
        logo:"https://webevolui.com.br/principal/imagem/web-evolui-logo.png",
        online:true,
        bloqueado:false,
        userId:user.id
      })
  }
}
