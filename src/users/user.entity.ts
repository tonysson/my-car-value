import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove , OneToMany } from 'typeorm';
import {Report} from '../reports/report.entity'

@Entity()
export class User {
    
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column({default : true})
  isAdmin : boolean 

  @OneToMany(() => Report , (report) => report.user)
  reports : Report[]

  @AfterInsert()
  logInsert(){
    console.log('Inserted User wid id', this.id)
  }

  @AfterUpdate()
  logUpdate(){
    console.log('Updtated User with id', this.id)
  }

  @AfterRemove()
    logRemove(){
      console.log('Removed User with id', this.id)
    }
  
}
