import dataSource from '../data-source/data-source'
import { VehicleEntity } from '../entities/vehicle.entity'

export const vehicleRepository = dataSource.getRepository(VehicleEntity)
