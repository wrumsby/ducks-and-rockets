import { CallbackFn } from './EventEmitter';
import { from } from './FlightPath';
import { GpsLocation } from './GpsLocation';
import { Moveable, MoveableEvents } from './Moveable';

// ducks can fly at around 65 kph
const DUCK_MOVE_KPH = 65;
  
export class Duck implements Moveable {
    private location: GpsLocation;
    private subscribers: Record<string, Array<CallbackFn<GpsLocation>>>;

    private constructor(location: GpsLocation) {
        this.location = location;

        this.subscribers = {
            [MoveableEvents.ARRIVED_EVENT]: [],
            [MoveableEvents.MOVED_EVENT]: [],
        };
    }

    public static at(location: GpsLocation) {
        return new Duck(location);
    }

    public currentLocation(): GpsLocation {
        return this.location;
    }

    public fire(event: string) {
        const subscribers = this.subscribers[event] || [];
        
        subscribers.forEach(subscriber => {
            subscriber(this.location);
        });
    }

    async moveTo(destination: GpsLocation): Promise<void> {
        const flightPath = from(this.location).to(destination, DUCK_MOVE_KPH);
        const n = flightPath.length;
        
        for (let i = 0; i < n; i++) {
            await new Promise(resolve => window.setTimeout(() => resolve(), 30));
            this.location = flightPath[i](this.location);
            this.fire(MoveableEvents.MOVED_EVENT);
        }

        this.fire(MoveableEvents.ARRIVED_EVENT);
    }

    public on(event: string, callback: CallbackFn<GpsLocation>) {
        switch (event) {
            case (MoveableEvents.ARRIVED_EVENT):
            case (MoveableEvents.MOVED_EVENT):
                this.subscribers[event].push(callback);
                break;
        }
    }
}
