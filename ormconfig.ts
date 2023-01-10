import {User,Contact} from './src/entities/index'
import {DB_URL} from './config'
import { DataSourceOptions } from 'typeorm'

export const options:DataSourceOptions = {
    url:DB_URL,
    type:'mysql',
    entities:[User,Contact],
    synchronize:true
}