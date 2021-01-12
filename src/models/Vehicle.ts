import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("vehicles")
export default class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column("decimal")
  daily_value: number;

  @Column()
  transmission_type: string;

  @Column()
  fuel_type: string;

  @Column("decimal")
  acceleration: number;

  @Column("int")
  maximun_speed: number;

  @Column("int")
  seats: number;

  @Column("int")
  potency: number;

  @Column()
  car_image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "car_image_url" })
  getCarImageUrl(): string | null {
    return this.car_image
      ? `http://localhost:3333/files/${this.car_image}`
      : null;
  }
}
