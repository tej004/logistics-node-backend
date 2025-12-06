import { RiderEntity } from "@/database/entities/rider.entity";
import { ERole } from "@/types/enums/db/role.enum";
import { userRepository } from "@/database/repositories/user.repository";
import { riderRepository } from "@/database/repositories/rider.repository";

export class RiderService {
  static async register(riderData: Partial<RiderEntity>, userId: string) {
    const user = await userRepository.findOne({ where: { uuid: userId } });
    if (!user) throw new Error("User not found");

    if (user.role !== ERole.RIDER) throw new Error("User is not a rider");

    const existingRider = await riderRepository.findOne({ where: { user: { uuid: userId } } });
    if (existingRider) throw new Error("Rider registration already exists");

    const rider = riderRepository.create({
      ...riderData,
      user: user
    });
    await riderRepository.save(rider);
    return rider;
  }

  static async getProfile(userId: string) {
    return riderRepository.findOne({ where: { user: { uuid: userId } } });
  }
}