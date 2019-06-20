import React from 'react';
import Person from './Person/Person';

const persons = props =>
  props.persons.map((person, index) => {
    return <Person
      key={person.id}
      click={() => props.deletePerson(index)}
      name={person.name}
      age={person.age}
      changed={(event) => props.nameChange(event, person.id)}
    />
  });

export default persons;