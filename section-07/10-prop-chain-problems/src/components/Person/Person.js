import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Person.css';

class Person extends Component {
  render() {
    console.log('[Person.js] [CREATE] render');
    // const isLoggedIn = this.props.isAuth? <p key="key0">Authenticated</p> : <p key="key0">Please login</p>
    return (
      <div>
        {this.props.isAuth? <p key="key0">Authenticated</p> : <p key="key0">Please login</p>}
        <p onClick={this.props.click} key="key1">I'm {this.props.name} and I am {this.props.age} years old!</p>
        <p key="key2">{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} key="key3"/>
      </div>
    )
  }
}

Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
  click: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default Person;
