import {DataSource} from 'typeorm'
import { options } from './ormconfig';



export const db = new DataSource(options)