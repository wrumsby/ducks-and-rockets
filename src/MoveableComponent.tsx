import React from 'react';

import { Duck } from './Duck';
import { DuckComponent } from './DuckComponent';
import { Moveable } from './Moveable';
import { Rocket } from './Rocket';
import { RocketComponent } from './RocketComponent';

interface Props {
    identifier: number;
    moveable: Moveable;
}

export const MoveableComponent = (props: Props) => {
    const { identifier, moveable } = props;

    if (moveable instanceof Duck) {
        return (
            <DuckComponent identifier={identifier} duck={moveable as Duck}/>
        );
    }

    if (moveable instanceof Rocket) {
        return (
            <RocketComponent identifier={identifier} rocket={moveable as Rocket}/>
        );
    }

    return (<div/>);
};