import React, {Component} from 'react';

class Person extends Component {
  state = {
    person: {
      id: this.props.person.id,
      name: this.props.person.name,
      city: this.props.person.city
    }
  };
  
  changeNameHandler = (event) => {
    const name = event.target.value;
    this.setState({
      person: { ... this.state.person, name}
    });
  };
  
  changeCityHandler = (event) => {
    const city = event.target.value;
    this.setState({
      person: { ... this.state.person, city}
    });
  };
  
  render() {
    const {name, city} = this.props.person;
    const person = this.state.person; // ...
    
    return (<div className="Person">
      <p>{name} from {city}</p>
      <div>
        <input type="text" onChange={this.changeNameHandler}/>
        <input type="text" onChange={this.changeCityHandler}/>
        <button onClick={() => this.props.update(person)}>Update</button>
        <button onClick={this.props.remove}>Remove</button>
      </div>
    </div>)
  }
}

export default Person;
