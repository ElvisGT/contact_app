import {Column, 
        Entity, 
        PrimaryGeneratedColumn,
        BaseEntity} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  name:string
  
  @Column()
  password:number

  @Column({
    default:true
  })
  active:boolean
}