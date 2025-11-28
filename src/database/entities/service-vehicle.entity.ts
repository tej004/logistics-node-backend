import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { ServiceEntity } from "./service.entity";
import { VehicleEntity } from "./vehicle.entity";
import { TimestampEntity } from "./common/timestamp.abstract.entity";

@Entity("service_vehicle")
@Unique(["serviceId", "vehicleId"])
export class ServiceVehicleEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "uuid" })
  serviceId: string;

  @Column({ type: "uuid" })
  vehicleId: string;

  @ManyToOne(() => ServiceEntity, { eager: true, nullable: false })
  @JoinColumn({ name: "serviceId" })
  service: ServiceEntity;

  @ManyToOne(() => VehicleEntity, { eager: true, nullable: false })
  @JoinColumn({ name: "vehicleId" })
  vehicle: VehicleEntity;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  basePrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  pricePerKM: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column(() => TimestampEntity, { prefix: false })
  timestamps: TimestampEntity;
}
