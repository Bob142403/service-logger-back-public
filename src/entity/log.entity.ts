import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("log")
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  serviceId: number;
}
