import {DataSource} from 'typeorm'
import {User,Contact,Contact_User} from './src/entities/index'


export const db = new DataSource({
  host:'localhost',
  type:'mysql',
  username:'root',
  password:'elvisgt99',
  database:'contacts',
  port:3306,
  entities:[User,Contact,Contact_User],
  synchronize:true,
  
})