import { User } from './User';
import {Column,
        PrimaryGeneratedColumn,
        Entity, 
        BaseEntity,
        ManyToMany,
        JoinTable,
        ManyToOne} from 'typeorm'

@Entity()
export class Contact extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  name:string

  @Column()
  phonenumber:number

  @Column({default:true})
  active:boolean

  @ManyToOne(() => User,(user) => user.contacts)
  users:User

}