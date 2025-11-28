import {
  EBookedRiderStatus,
  EBookingStatus,
} from "@/types/enums/db/booking.enum";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { RiderEntity } from "./rider.entity";
import { ServiceVehicleEntity } from "./service-vehicle.entity";
import { LocationEntity } from "./common/location.abstract.entity";
import { TimestampEntity } from "./common/timestamp.abstract.entity";

@Entity("booking")
export class BookingEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "text" })
  notes: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  contactPerson: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  contactNumber: string;

  @Column({
    type: "enum",
    enum: EBookingStatus,
    default: EBookingStatus.PENDING,
  })
  bookingStatus: EBookingStatus;

  @Column({
    type: "enum",
    enum: EBookedRiderStatus,
    default: EBookedRiderStatus.NOT_ASSIGNED,
  })
  bookedRiderStatus: EBookedRiderStatus;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ type: "uuid", nullable: true })
  riderId: string;

  @ManyToOne(() => RiderEntity, { eager: true, nullable: true })
  @JoinColumn({ name: "riderId" })
  rider: RiderEntity;

  @Column({ type: "uuid" })
  serviceVehicleId: string;

  @ManyToOne(() => ServiceVehicleEntity, { eager: true, nullable: false })
  @JoinColumn({ name: "serviceVehicleId" })
  serviceVehicle: ServiceVehicleEntity;

  @Column(() => LocationEntity, { prefix: "destination" })
  destinations: LocationEntity;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  price: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  kilometers: number;

  @Column(() => LocationEntity, { prefix: "origin" })
  origins: LocationEntity;

  @Column(() => TimestampEntity, { prefix: false })
  timestamps: TimestampEntity;
}
