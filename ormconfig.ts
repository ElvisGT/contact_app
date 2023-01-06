import {User,Contact,Contact_User} from './src/entities/index'
import {DB_URL} from './config'
import { DataSourceOptions } from 'typeorm'

export const options:DataSourceOptions = {
    url:DB_URL,
    type:'mysql',
    entities:[User,Contact,Contact_User],
    synchronize:true
}