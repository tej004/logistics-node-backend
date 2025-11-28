import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDbSchema1764345024827 implements MigrationInterface {
    name = 'InitDbSchema1764345024827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(250) NOT NULL, "name" character varying(200) NOT NULL, "price" numeric(10,2), "thumbnail" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7abeefd7e08ff3587b4b7ca0f19" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "public"."rider_riderregistrationstatus_enum" AS ENUM('pending', 'approved', 'declined')`);
        await queryRunner.query(`CREATE TABLE "rider" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "licenseNumber" character varying(500) NOT NULL, "plateNumber" character varying(500) NOT NULL, "attachments" text array, "riderRegistrationStatus" "public"."rider_riderregistrationstatus_enum" NOT NULL DEFAULT 'pending', "userId" uuid, "vehicleId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_71a3a9758e8b4eb857c53bfdf4" UNIQUE ("userId"), CONSTRAINT "PK_10b5f496d931f1f0773f0a7fcc3" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female', 'blank')`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('customer', 'admin', 'rider')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive', 'suspended')`);
        await queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(100) NOT NULL, "middleName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "number" character varying(25) NOT NULL, "password" character varying(500) NOT NULL, "gender" "public"."user_gender_enum" NOT NULL DEFAULT 'blank', "role" "public"."user_role_enum" NOT NULL DEFAULT 'customer', "status" "public"."user_status_enum" NOT NULL DEFAULT 'active', "birthdate" date, "address" character varying(500), "isVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_81e762f957fa9a13524029a3b7f" UNIQUE ("number"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "service" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(250) NOT NULL, "name" character varying(200) NOT NULL, "price" numeric(10,2), "thumbnail" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5c74b525a89a34199d317da0d8" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "service_vehicle" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "serviceId" uuid NOT NULL, "vehicleId" uuid NOT NULL, "basePrice" numeric(10,2) NOT NULL, "pricePerKM" numeric(10,2) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_77d19d3b0d9809483428aceae11" UNIQUE ("serviceId", "vehicleId"), CONSTRAINT "PK_c1c4aa0de5279b7195fd7f87cfc" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "public"."booking_bookingstatus_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no-driver-found', 'rejected')`);
        await queryRunner.query(`CREATE TYPE "public"."booking_bookedriderstatus_enum" AS ENUM('not-assigned', 'assigned', 'on-the-way', 'arrived', 'started-packing', 'on-the-way-to-destination', 'delivered')`);
        await queryRunner.query(`CREATE TABLE "booking" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "notes" text NOT NULL, "contactPerson" character varying(250), "contactNumber" character varying(50), "bookingStatus" "public"."booking_bookingstatus_enum" NOT NULL DEFAULT 'pending', "bookedRiderStatus" "public"."booking_bookedriderstatus_enum" NOT NULL DEFAULT 'not-assigned', "userId" uuid NOT NULL, "riderId" uuid, "serviceVehicleId" uuid NOT NULL, "price" numeric(10,2), "kilometers" numeric(10,2), "destinationLatitude" numeric(10,7) NOT NULL, "destinationLongitude" numeric(10,7) NOT NULL, "originLatitude" numeric(10,7) NOT NULL, "originLongitude" numeric(10,7) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a301e30d2ae38b568400128440a" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "rider" ADD CONSTRAINT "FK_71a3a9758e8b4eb857c53bfdf4e" FOREIGN KEY ("userId") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rider" ADD CONSTRAINT "FK_369289b0509397a118427efb2cd" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_vehicle" ADD CONSTRAINT "FK_bf563bf63a69011753abf42d0a4" FOREIGN KEY ("serviceId") REFERENCES "service"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_vehicle" ADD CONSTRAINT "FK_ed15eb41ea7e38d179c86b90b80" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_09df476890d30bfc2aa762276f1" FOREIGN KEY ("riderId") REFERENCES "rider"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_d1170f396d3431714ceb8bf9c56" FOREIGN KEY ("serviceVehicleId") REFERENCES "service_vehicle"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_d1170f396d3431714ceb8bf9c56"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_09df476890d30bfc2aa762276f1"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "service_vehicle" DROP CONSTRAINT "FK_ed15eb41ea7e38d179c86b90b80"`);
        await queryRunner.query(`ALTER TABLE "service_vehicle" DROP CONSTRAINT "FK_bf563bf63a69011753abf42d0a4"`);
        await queryRunner.query(`ALTER TABLE "rider" DROP CONSTRAINT "FK_369289b0509397a118427efb2cd"`);
        await queryRunner.query(`ALTER TABLE "rider" DROP CONSTRAINT "FK_71a3a9758e8b4eb857c53bfdf4e"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_bookedriderstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."booking_bookingstatus_enum"`);
        await queryRunner.query(`DROP TABLE "service_vehicle"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "rider"`);
        await queryRunner.query(`DROP TYPE "public"."rider_riderregistrationstatus_enum"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
    }

}
