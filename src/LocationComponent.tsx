import React, { CSSProperties } from 'react';
import { NamedGpsLocation } from './GpsLocation';

interface Props {
    location: NamedGpsLocation;
}

interface State {}

export class LocationComponent extends React.Component<Props, State> {
    render() {
        const currentLocation = this.props.location;

        const style: CSSProperties = {
            position: 'absolute',
            left: `${((currentLocation.longitude + 180) / 360) * 100 - 5}%`,
            top: `${((-1 * currentLocation.latitude + 90) / 180) * 100}%`,
            paddingTop: '12px'
        };

        return (
            <div style={style}>
                <b>{currentLocation.name}</b>
                <div>
                    <small style={({color: '#666'})}>
                        ({currentLocation.latitude}, {currentLocation.longitude})
                    </small>
                </div>
            </div>
        )
    }
}