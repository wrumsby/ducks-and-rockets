import React, { CSSProperties } from "react";

import { GpsLocation } from "./GpsLocation";
import { Rocket } from "./Rocket";
import { MoveableEvents } from "./Moveable";

interface Props {
    identifier: number;
    rocket: Rocket;
}

interface State {
    location: GpsLocation;
}

export class RocketComponent extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            location: props.rocket.currentLocation()
        }
    }

    public componentDidMount() {
        this.props.rocket.on(MoveableEvents.MOVED_EVENT, (location: GpsLocation) => {
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
                <span role="img" aria-label="rocket" style={({fontSize: '32px', paddingLeft: '40px'})}>
                    🚀
                </span>
            </div>
        )
    }
}