import {Column, 
        Entity, 
        PrimaryGeneratedColumn,
        BaseEntity,
        ManyToMany} from 'typeorm'

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

}