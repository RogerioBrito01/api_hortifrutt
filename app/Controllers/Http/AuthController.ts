import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin';
import Cliente from 'App/Models/Cliente';
import Estabelecimento from 'App/Models/Estabelecimento';
import User from 'App/Models/User'
import { appKey } from 'Config/app';

export default class AuthController {
  
   public async login({auth, request,response}:HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
        const user = await User.findByOrFail("email",email);
        let expira;
        switch(expira){
            case "clientes":
                expira= "30 days";
            break;  
            case "estabelecimento":
                expira= "7days"  ;
            break;
            case "admins":
                expira = "1year";
            break;
            default:
                expira = "30days"
        }
        const token =await auth.use("api").attempt(email,password,{
            expiresIn:expira,
            name:user.serialize().email,

        });
        response.ok(token);
        
    } catch (error) {
        return response.badRequest("Invalid credentials")
        
    }
   }
   public async logout({auth,response}:HttpContextContract){
    try {
        await auth.use("api").revoke();
    } catch  {
        return response.unauthorized("No authotizatin for it");
        
    }
    return response.ok({
        revoked:true,

    })
   }
   public async me({auth,response}:HttpContextContract){
    const userAuth = await auth.use("api").authenticate();
    let data;
    switch(userAuth.tipo){
        case "cliente":
            const cliente = await Cliente.findByOrFail("userId",userAuth.id);
            data= {
                id_cliente:cliente.id,
                name:cliente.name,
                telefone:cliente.telefone,
                email: userAuth.email,
            }
        break;
        case "estabelecimentos":
            const estabelecimento= await Estabelecimento.findByOrFail("userId",userAuth.id);
            data={
                id_estabelecimento: estabelecimento.id,
                name:estabelecimento.name,
                logo:estabelecimento.logo,
                bloqueio:estabelecimento.bloqueado,
                online:estabelecimento.online,
                email: userAuth.email
            };
            break;
            case "admins":
                const admin =await Admin.findByOrFail("userId",userAuth.id);
                data={
                    id_admin: admin.id,
                    name:admin.name,
                    email: userAuth.email,
                };
                break;
            default:
                return response.unauthorized("Unauthorized user -type not found");

    }
    return response.ok(data);
   }
}
