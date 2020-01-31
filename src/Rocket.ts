import { CallbackFn } from './EventEmitter';
import { GpsLocation, GpsLocationImpl } from './GpsLocation';
import { Moveable, MoveableEvents } from './Moveable';

const TIMEOUT = 10;
const DELTA = 0.3;
const CLIMB = 750;

export class Rocket implements Moveable {
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
        return new Rocket(location);
    }

    public currentLocation() {
        return this.location;
    }

    public async moveTo(destination: GpsLocation): Promise<void> {
        const scope = this;

        return new Promise(async (resolve) => {
            for (let i = 0; i < CLIMB; i++) {
                await new Promise(r => setTimeout(() => r(), TIMEOUT));
                scope.location = new GpsLocationImpl(scope.location.latitude + DELTA, scope.location.longitude);
                scope.fire(MoveableEvents.MOVED_EVENT);        
            }

            resolve();
        }).then(() => {
            return new Promise(resolve => {
                window.setTimeout(() => {
                    scope.location = new GpsLocationImpl(destination.latitude, destination.longitude);
                    scope.fire(MoveableEvents.MOVED_EVENT);        
                    scope.fire(MoveableEvents.ARRIVED_EVENT);
                    
                    resolve();
                }, TIMEOUT);
            });
        });
    }
    
    public on(event: string, callback: CallbackFn<GpsLocation>) {
        switch (event) {
            case MoveableEvents.ARRIVED_EVENT:
            case MoveableEvents.MOVED_EVENT:
                this.subscribers[event].push(callback);
                break;
        }
    }
    
    public fire(event: string) {
        const subscribers = this.subscribers[event] || [];
        
        subscribers.forEach(subscriber => {
            subscriber(this.location);
        });
    }
}