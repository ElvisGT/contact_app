import { Contact } from './Contact';
import {Column, 
        Entity, 
        PrimaryGeneratedColumn,
        BaseEntity,
        JoinTable,
        ManyToMany,
        ManyToOne,
        OneToMany} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  name:string
  
  @Column()
  password:string

  @Column({
    default:true
  })
  active:boolean

  @OneToMany(() => Contact,(contact) => contact.users)
  contacts:Contact
}