import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./client.entity";
import { User } from "../../users/entities/user.entity";

export enum DealStage {
  NEW = "New",
  CONTACTED = "Contacted",
  PROPOSAL = "Proposal",
  WON = "Won",
  LOST = "Lost",
}

@Entity("deals")
export class Deal {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @ManyToOne(() => Client)
  client: any;

  @Column("decimal", { nullable: true })
  value: any;

  @Column({ type: "enum", enum: DealStage, default: DealStage.NEW })
  stage: any;

  @ManyToOne(() => User, { nullable: true })
  owner: any;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: any;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: any;
}
