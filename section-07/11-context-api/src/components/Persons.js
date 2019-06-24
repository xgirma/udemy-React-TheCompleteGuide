import React, {Component} from 'react';
import Person from './Person/Person';
import withClass from '../hoc/withClass';

class Persons extends Component {
  state = {};
  
  static getDerivedStateFromProps(props, state){
    console.log('[Persons.js][CREATE] [UPDATE] getDerivedStateFormProps', props);
    return state;
  }
  
  // optimization
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[Persons.js] [UPDATE] shouldComponentUpdate');
    return nextProps.persons !== this.props.persons;
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] [UPDATE] getSnapshotBeforeUpdate');
    return null;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] [UPDATE] componentDidUpdate');
  }
  
  componentWillUnmount() {
    console.log('[Persons.js][CLEANUP] componentWillUnmount');
  }
  
  render() {
    console.log('[Persons.js] [CREATE][UPDATE] render');
    
    return this.props.persons.map((person, index) => {
      return <Person
        key={person.id}
        click={() => this.props.deletePerson(index)}
        name={person.name}
        age={person.age}
        changed={(event) => this.props.nameChange(event, person.id)}
      />
    })
  };
}

export default withClass(Persons);