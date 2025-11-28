import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { ERiderRegistrationStatus } from "@/types/enums/db/rider-registration-status.enum";
import { TimestampEntity } from "./common/timestamp.abstract.entity";
import { VehicleEntity } from "./vehicle.entity";

@Entity("rider")
export class RiderEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @OneToOne(() => UserEntity, (user) => user.rider)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ type: "varchar", length: 500 })
  licenseNumber: string;

  @Column({ type: "varchar", length: 500 })
  plateNumber: string;

  @Column({ type: "text", array: true, nullable: true })
  attachments: string[];

  // unidirectional for now
  @ManyToOne(() => VehicleEntity, { nullable: false })
  @JoinColumn({ name: "vehicleId" })
  vehicle: VehicleEntity;

  @Column({
    type: "enum",
    enum: ERiderRegistrationStatus,
    default: ERiderRegistrationStatus.PENDING,
  })
  riderRegistrationStatus: ERiderRegistrationStatus;

  @Column(() => TimestampEntity, { prefix: false })
  timestamps: TimestampEntity;
}
