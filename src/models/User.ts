import {
  Column,
  CreateDateColumn,
  Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'

import { Exclude } from 'class-transformer'

@Entity('users')
export default class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column('boolean')
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}