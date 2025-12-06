import dataSource from '../data-source/data-source'
import { RiderEntity } from '../entities/rider.entity'

export const riderRepository = dataSource.getRepository(RiderEntity)
