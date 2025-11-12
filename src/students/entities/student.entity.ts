import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  groupId!: number;
}
