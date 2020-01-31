import React, { CSSProperties } from 'react';

import { Duck } from './Duck';
import { AUCKLAND, LONDON, NEW_YORK, TOKYO, NamedGpsLocation, GpsLocation } from './GpsLocation';
import { LocationComponent } from './LocationComponent';
import { Moveable, MoveableEvents } from './Moveable';
import { MoveableComponent } from './MoveableComponent';
import { Rocket } from './Rocket';
import './App.css';

const locations: ReadonlyArray<NamedGpsLocation> = [AUCKLAND, LONDON, NEW_YORK, TOKYO];
const ducks: ReadonlyArray<Moveable> = locations.map(loc => Duck.at(loc));
const rockets: ReadonlyArray<Moveable> = locations.map(loc => Rocket.at(loc));
const moveables: ReadonlyArray<Moveable> = ducks.concat(rockets);

const style: CSSProperties = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#333',
  position: 'relative',
  margin: '60px',
  height: '80vh',
}

interface Props {}

interface State {
  arrived: number;
  disabled: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      arrived: 0,
      disabled: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    moveables.forEach(moveable => {
      moveable.on(MoveableEvents.ARRIVED_EVENT, (_location: GpsLocation) => {
        const arrived = this.state.arrived + 1;

        this.setState({
          arrived
        });
    
        if (arrived >= moveables.length) {
          this.setState({
            disabled: false
          });
        }
      });
    })    
  }

  handleClick() {
    this.setState({
      arrived: 0,
      disabled: true
    });

    moveables.forEach(moveable => {
      const filteredLocations = locations.filter(location => !moveable.currentLocation().isNear(location));
      const n = filteredLocations.length;
      const index = Math.floor(Math.random() * n);
      const loc = filteredLocations[index];
  
      moveable.moveTo(loc);
    });
  }

  render() {
    const { disabled } = this.state;

    return (
      <div className="App">
        <div>
          <button onClick={() => this.handleClick()} disabled={disabled}>Change</button>
        </div>
        <div>
          <div style={style}>
            {moveables.map((moveable: Moveable, index: number) => 
              <MoveableComponent key={index} identifier={index} moveable={moveable}/>
            )}
            {locations.map((loc: NamedGpsLocation, index: number) => 
              <LocationComponent key={index} location={loc}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
