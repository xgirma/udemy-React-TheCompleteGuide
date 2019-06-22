import React, {Component} from 'react';

import './Person.css';

class Person extends Component {
  render() {
    console.log('[Person.js] [CREATE] render');
    return [
      <p onClick={this.props.click} key="key1">I'm {this.props.name} and I am {this.props.age} years old!</p>,
      <p key="key2">{this.props.children}</p>,
      <input type="text" onChange={this.props.changed} value={this.props.name} key="key3"/>
    ]
  }
}

export default Person;
