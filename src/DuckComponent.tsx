import React, { CSSProperties } from 'react';
import { Duck } from './Duck';
import { GpsLocation } from './GpsLocation';
import { MoveableEvents } from './Moveable';

interface Props {
    identifier: number;
    duck: Duck;
}

interface State {
    location: GpsLocation;
}

export class DuckComponent extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            location: props.duck.currentLocation()
        }
    }

    public componentDidMount() {
        this.props.duck.on(MoveableEvents.MOVED_EVENT, (location: GpsLocation) => {
            this.setState({ location });
        });
    }

    public render() {
        const currentLocation = this.state.location;

        const style: CSSProperties = {
            position: 'absolute',
            left: `${((currentLocation.longitude + 180) / 360) * 100}%`,
            top: `${((-1 * currentLocation.latitude + 90) / 180) * 100}%`,
            padding: `${this.props.identifier * 2}px`
        };

        return (
            <div style={style}>
                <span role="img" aria-label="duck" style={({fontSize: '32px'})}>
                    🦆
                </span>
            </div>
        )
    }
}