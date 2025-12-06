import { vehicleRepository } from '@/database/repositories/vehicle.repository'

export class VehicleService {
  static async getAllVehicles() {
    return vehicleRepository.find()
  }

  static async createVehicle(vehicleData: any) {
    return vehicleRepository.create(vehicleData)
  }

  static async getVehicleById(vehicleId: string) {
    return vehicleRepository.findOne({ where: { uuid: vehicleId } })
  }

  static async updateVehicle(vehicleId: string, updateData: any) {
    return vehicleRepository.update(vehicleId, updateData)
  }

  static async deleteVehicle(vehicleId: string) {
    return vehicleRepository.delete(vehicleId)
  }
}
