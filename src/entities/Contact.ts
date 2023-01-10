import {Column,
        PrimaryGeneratedColumn,
        Entity, 
        BaseEntity} from 'typeorm'

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
}