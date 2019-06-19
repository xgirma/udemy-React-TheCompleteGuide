# Section 5: Styling React Components & Elements

## Setting style dynamically

```javascript
import React from 'react';
import './App.css';

function App() {
  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };
  
  return (
    <div className="App">
      <button style={show? style: {...style, background: 'green'}} onClick={toggleShow}>{show ? 'Hide' : 'Show'}</button>
    </div>
  );
}

export default App;
```

## Setting className dynamically

```css
.red {
  color: crimson;
}

.bold {
  font-weight: bold;
}
```

```javascript
import React from 'react';
import './App.css';

function App() {
  const classes = [];
  
  if(persons.length <= 2){ classes.push('red') }
  if(persons.length <= 1){ classes.push('bold') }
  
  return (
    <div className="App">
      <p className={classes.join(' ')}>Persons list</p>
    </div>
  );
}

export default App;
```

## Radium 

https://formidable.com/open-source/radium/

```javascript
import React, {Component} from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium'; // ...
import Persons from "./Persons";

class App extends Component {
  state = {
    persons: [
      {id: "g1", name: "Sofia", city: 'Seattle'},
      {id: "m1", name: "Thomas", city: 'Bellevue'},
      {id: "g2", name: "Maria", city: 'Durham'},
    ],
    show: false
  };
  
  showListToggleHandler = () => {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  };
  
  render() {
    const pStyle = {textAlign: 'center'};
    const { show, persons } = this.state;
  
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {  // ...
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    
    return (
      <StyleRoot> //..
        <div style={pStyle}>
          <h3 style={style}>LIST of PEOPLE</h3>
          <button onClick={this.showListToggleHandler}>{
            show ? 'Hide' : 'Show'
          }</button>
          <Persons persons={persons}/>
        </div>
      </StyleRoot>
    )
  }
}

export default Radium(App);
```

```javascript
import React, {Component} from 'react';
import Radium from 'radium';

class Person extends Component {
  state = {
    person: {
      id: this.props.person.id,
      name: this.props.person.name,
      city: this.props.person.city
    }
  };
  
  render() {
    const {name, city} = this.props.person;
    
    const style = {
      '@media(min-width: 500px)': {
        width: '450px'
      }
    };
    
    return (<div className="Person" style={style}> // override the style with Person class name ...
      <p>{name} from {city}</p>
    </div>)
  }
}

export default Radium(Person);
```