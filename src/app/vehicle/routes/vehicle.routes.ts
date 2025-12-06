import { Router } from 'express'
import { VehicleController } from '../controllers/vehicle.controller'
import { authJwtMiddleware } from '@/app/auth/middlewares/auth.jwt.middleware'

const routes = Router()

routes.get('', authJwtMiddleware, VehicleController.getAllVehicles)
routes.post('', authJwtMiddleware, VehicleController.createVehicle)
routes.get('/:id', authJwtMiddleware, VehicleController.getVehicleById)
routes.patch('/:id', authJwtMiddleware, VehicleController.updateVehicle)
routes.delete('/:id', authJwtMiddleware, VehicleController.deleteVehicle)

export default routes
