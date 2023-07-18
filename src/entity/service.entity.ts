import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("service")
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;
}
