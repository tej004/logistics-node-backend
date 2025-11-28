import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./common/timestamp.abstract.entity";

@Entity("vehicle")
export class VehicleEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", length: 250 })
  description: string;

  @Column({ type: "varchar", length: 200 })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: "varchar", length: 500 })
  thumbnail: string;

  @Column(() => TimestampEntity, { prefix: false })
  timestamps: TimestampEntity;
}
