import React, {Component} from 'react';
import Person from "./Person";

class Persons extends Component {
  render() {
    const {persons, show, update, remove} = this.props;
    let list = null;
    
    if (show) {
      list = (<div>
        {persons.map((person) => {
          return <Person
            key={person.id}
            person={person}
            update={(p) => update(p)}
            remove={() => remove(person)}/>
        })}
      </div>)
    }
    
    return (<div>{list}</div>);
  }
}

export default Persons;
