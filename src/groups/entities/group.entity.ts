import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;
}
