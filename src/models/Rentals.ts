import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";
import Vehicle from "./Vehicle";

@Entity("rentals")
export default class Rentals {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  client_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "client_id" })
  client: User;

  @Column()
  car_id: string;

  @OneToOne(() => Vehicle, { eager: true })
  @JoinColumn({ name: "car_id" })
  car: Vehicle;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

