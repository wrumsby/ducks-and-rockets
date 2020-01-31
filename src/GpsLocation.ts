export interface GpsLocation { 
    latitude: number;
    longitude: number;
    isNear: (location: GpsLocation) => boolean;
}

interface Named {
    name: string;
  }
  
export interface NamedGpsLocation extends GpsLocation, Named {};

export class GpsLocationImpl implements GpsLocation {
    public latitude: number;
    public longitude: number;

    public constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public isNear(location: GpsLocation): boolean {
        const latitudeDifference = Math.abs(this.latitude - location.latitude);
        const longitudeDifference = Math.abs(this.longitude - location.longitude);

        return latitudeDifference < 0.2 && longitudeDifference < 0.2;
    }
}

class NamedGpsLocationImpl implements NamedGpsLocation {
    private location: GpsLocation;
    public name: string;

    get latitude(): number {
        return this.location.latitude;
    }

    set latitude(latitude: number) {
        this.location.latitude = latitude;
    }

    get longitude(): number {
        return this.location.longitude;
    }

    set longitude(longitude: number) {
        this.location.longitude = longitude;
    }

    public constructor(name: string, latitude: number, longitude: number) {
        this.location = new GpsLocationImpl(latitude, longitude);
        this.name = name;
    }

    public isNear(location: GpsLocation): boolean {
        return this.location.isNear(location);
    }
}

export const AUCKLAND: NamedGpsLocation = new NamedGpsLocationImpl('Auckland', -36.8497513, 174.762881);
export const HAMILTON: NamedGpsLocation = new NamedGpsLocationImpl('Hamilton', -37.788246154785156, 175.28036499023438);
export const LONDON: NamedGpsLocation = new NamedGpsLocationImpl('London', 51.53386688232422, -0.1326841115951538);
export const NEW_YORK: NamedGpsLocation = new NamedGpsLocationImpl('New York', 40.733154296875, -73.99571228027344);
export const TOKYO: NamedGpsLocation = new NamedGpsLocationImpl('Tokyo', 35.774302, 139.790039);
