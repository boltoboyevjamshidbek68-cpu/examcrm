import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  SALES = "sales",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: "User" })
  name!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.SALES })
  role!: UserRole;

  @Column({ type: "text", nullable: true })
  refreshToken!: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
