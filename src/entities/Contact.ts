import { User } from './User';
import {Column,
        PrimaryGeneratedColumn,
        Entity, 
        BaseEntity,
        JoinTable,
        ManyToMany} from 'typeorm'

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

  @ManyToMany(() => User,(user) => user.contact)
  @JoinTable()
  user:User[]

}