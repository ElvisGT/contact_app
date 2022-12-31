import {Column,
        PrimaryGeneratedColumn,
        Entity, 
        BaseEntity} from 'typeorm'

@Entity()
export class Contact_User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  user_id:number

  @Column()
  contact_id:number
}