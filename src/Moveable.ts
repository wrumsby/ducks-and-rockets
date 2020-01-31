import { EventEmitter } from './EventEmitter';
import { GpsLocation } from './GpsLocation';

export interface Moveable extends EventEmitter<GpsLocation> {
    currentLocation: () => GpsLocation;
    moveTo: (destination: GpsLocation) => Promise<void>;
}

export const MoveableEvents = {
    ARRIVED_EVENT: 'arrived',
    MOVED_EVENT: 'moved',
};
