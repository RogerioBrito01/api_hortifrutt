
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string

  @column()
  public estado_id: number

  @column()
  public ativo: boolean
}
