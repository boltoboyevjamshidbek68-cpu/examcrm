import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  studentId!: number;

  @Column({ type: 'date', nullable: true })
  date!: string;

  @Column({ nullable: true })
  status!: string;
}
