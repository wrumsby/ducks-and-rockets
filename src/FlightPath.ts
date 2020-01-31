import { GpsLocation, GpsLocationImpl } from './GpsLocation';

const degreesToRadians = (degrees: number) => degrees * Math.PI / 180;
  
const distanceInKmBetweenEarthCoordinates = (loc1: GpsLocation, loc2: GpsLocation) => {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(loc2.latitude - loc1.latitude);
    const dLon = degreesToRadians(loc2.longitude - loc1.longitude);

    const lat1 = degreesToRadians(loc1.latitude);
    const lat2 = degreesToRadians(loc2.latitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

    return earthRadiusKm * c;
}

type MoveFn = (currentLocation: GpsLocation) => GpsLocation;

export const from = (from: GpsLocation) => {
    const to = (to: GpsLocation, kph: number): Array<MoveFn> => {
        const km = distanceInKmBetweenEarthCoordinates(from, to);
        const moves = Math.floor(km / kph);

        if (moves === 0) {
            if (from.isNear(to)) {
                return [];
            }
        }

        const latitudeChange = ((to.latitude - from.latitude) / moves);
        const longitudeChange = ((to.longitude - from.longitude) / moves);

        const path: Array<MoveFn> = [];

        for (let i = 0; i < moves; i++) {
            const fn: MoveFn = (currentLocation: GpsLocation) => {
                const newLocation = new GpsLocationImpl(
                    currentLocation.latitude + latitudeChange,
                    currentLocation.longitude + longitudeChange,
                );

                return newLocation;
            };

            path.push(fn);
        }

        path.push((_currentLocation: GpsLocation) => to);

        return path;
    };

    return { to };
};