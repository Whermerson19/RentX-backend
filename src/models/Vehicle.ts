import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('vehicles')
export default class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('decimal')
  daily_value: number;

  @Column()
  transmission_type: string;

  @Column()
  fuel_type: string;

  @Column('decimal')
  acceleration: number;

  @Column('decimal')
  maximun_speed: number;

  @Column('integer')
  seats: number;

  @Column('integer')
  potency: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}