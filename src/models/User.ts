import {
  Column,
  CreateDateColumn,
  Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'

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

  @Expose({name: 'url_image'})
  getUrlImage(): string | null {
    return this.image ? `http://localhost:3333/files/${this.image}` : null
  }

}