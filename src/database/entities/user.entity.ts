import { EGender } from "@/types/enums/db/gender.enum";
import { ERole } from "@/types/enums/db/role.enum";
import { EStatus } from "@/types/enums/db/status.enum";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { RiderEntity } from "./rider.entity";
import { TimestampEntity } from "./common/timestamp.abstract.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", length: 100 })
  firstName: string;

  @Column({ type: "varchar", length: 100 })
  middleName: string;

  @Column({ type: "varchar", length: 100 })
  lastName: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email: string;

  @Column({ type: "varchar", length: 25, unique: true })
  number: string;

  @Column({ type: "varchar", length: 500 })
  password: string;

  @Column({ type: "enum", enum: EGender, default: EGender.BLANK })
  gender: EGender;

  @Column({ type: "enum", enum: ERole, default: ERole.CUSTOMER })
  role: ERole;

  @Column({ type: "enum", enum: EStatus, default: EStatus.ACTIVE })
  status: EStatus;

  @Column({ type: "date", nullable: true })
  birthdate: Date;

  @Column({ type: "varchar", length: 500, nullable: true })
  address: string;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @OneToOne(() => RiderEntity, (rider) => rider.user)
  rider: RiderEntity;

  @Column(() => TimestampEntity, { prefix: false })
  timestamps: TimestampEntity;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
