import last from 'lodash.last';

import { from } from './FlightPath';
import { AUCKLAND, NEW_YORK } from './GpsLocation';

describe('to', () => {
    it('should work', () => {
        const flightPath = from(AUCKLAND).to(NEW_YORK, 65);

        expect(flightPath.length).toBeGreaterThan(1);
    });

    it('should end up at the destination', () => {
        const flightPath = from(AUCKLAND).to(NEW_YORK, 65);
        const lastFn = last(flightPath);
        const destination = lastFn ? lastFn(AUCKLAND) : null;

        expect(destination).toEqual(NEW_YORK);
    });
});
