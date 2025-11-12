import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  studentId!: number;

  @Column({ type: 'decimal', nullable: true })
  amount!: number;

  @Column({ nullable: true })
  method!: string;

  @Column({ nullable: true })
  note!: string;
}
