import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, (s) => s.id, { nullable: true })
  student?: Student;

  @Column({ type: 'decimal', default: 0 })
  amount!: number;

  @Column({ default: 'pending' })
  status!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
