import { Router } from 'express'
import authRoutes from '../app/auth/routes/auth.routes'
import riderRoutes from '@/app/user/routes/rider.routes'
import vehicleRoutes from '@/app/vehicle/routes/vehicle.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/rider', riderRoutes)
router.use('/vehicle', vehicleRoutes)

export default router
