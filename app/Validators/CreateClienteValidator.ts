import { schema, CustomMessages ,rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name:schema.string({trim:true},[
      rules.maxLength(255),
      rules.unique({table:"users",column:"email"}),
    ]),
    email:schema.string({trim:true},[
      rules.email(),
      rules.maxLength(255),
      rules.unique({table:"users",column:"email"}),
    ]),
    password: schema.string({},[rules.minLength(8),rules.maxLength(180)]),
    
  });



 
  public messages: CustomMessages = {}
}
