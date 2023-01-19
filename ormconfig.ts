import {User,Contact} from './src/entities/index'
import {DB_HOST,
        DB_DATABASE,
        DB_PASSWORD,
        DB_PORT,
        DB_USER
    } from './config'
import { DataSourceOptions } from 'typeorm'

export const options:DataSourceOptions = {
    type:'mysql',
    entities:[User,Contact],
    synchronize:true,
    port:DB_PORT,
    host:DB_HOST,
    password:DB_PASSWORD,
    username:DB_USER,
    database:DB_DATABASE

}