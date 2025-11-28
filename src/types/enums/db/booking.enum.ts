export enum EBookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_DRIVER_FOUND = 'no-driver-found',
  REJECTED = 'rejected',
}

export enum EBookedRiderStatus {
  NOT_ASSIGNED = 'not-assigned',
  ASSIGNED = 'assigned',
  ON_THE_WAY = 'on-the-way',
  ARRIVED = 'arrived',
  STARTED_PACKING = 'started-packing',
  ON_THE_WAY_TO_DESTINATION = 'on-the-way-to-destination',
  DELIVERED = 'delivered',
}
