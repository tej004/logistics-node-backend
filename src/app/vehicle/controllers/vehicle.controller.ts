import { Request, Response } from 'express'
import { VehicleService } from '../services/vehicle.service'

export class VehicleController {
  static async getAllVehicles(req: Request, res: Response): Promise<Response> {
    try {
      const vehicles = await VehicleService.getAllVehicles()
      return res.status(200).json(vehicles)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching vehicles', error })
    }
  }

  static async createVehicle(req: Request, res: Response): Promise<Response> {
    try {
      const vehicleData = req.body
      const newVehicle = await VehicleService.createVehicle(vehicleData)
      return res.status(201).json(newVehicle)
    } catch (error) {
      return res.status(500).json({ message: 'Error creating vehicle', error })
    }
  }

  static async getVehicleById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const vehicle = await VehicleService.getVehicleById(id)
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' })
      }
      return res.status(200).json(vehicle)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching vehicle', error })
    }
  }

  static async updateVehicle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const updateData = req.body
      const updatedVehicle = await VehicleService.updateVehicle(id, updateData)
      return res.status(200).json(updatedVehicle)
    } catch (error) {
      return res.status(500).json({ message: 'Error updating vehicle', error })
    }
  }

  static async deleteVehicle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await VehicleService.deleteVehicle(id)
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting vehicle', error })
    }
  }
}
