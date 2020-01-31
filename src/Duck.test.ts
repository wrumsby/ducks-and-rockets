/* eslint-env jest */
import { Duck } from './Duck';
import { AUCKLAND, HAMILTON } from './GpsLocation'; 

describe('Duck', () => {
    it('should move', async () => {
        const duck = Duck.at(AUCKLAND);

        await duck.moveTo(HAMILTON);

        const duckLocation = duck.currentLocation();

        expect(duckLocation.isNear(HAMILTON)).toBe(true);
    });

    it('should fire moved events', async () => {
        const duck = Duck.at(AUCKLAND);
        const stub = jest.fn();

        duck.on('moved', stub);

        await duck.moveTo(HAMILTON);

        expect(stub).toHaveBeenCalled();
    });

    it('should not fire moved events if moveTo location is the currentLocation', async () => {
        const duck = Duck.at(AUCKLAND);
        const stub = jest.fn();

        duck.on('moved', stub);

        await duck.moveTo(duck.currentLocation());

        expect(stub).toHaveBeenCalledTimes(0);
    });
})