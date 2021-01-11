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

  @Column('int')
  maximun_speed: number;

  @Column('int')
  seats: number;

  @Column('int')
  potency: number;

  @Column()
  car_image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}