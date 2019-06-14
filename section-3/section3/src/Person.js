import React from 'react';

const Person = (props) => {
  return (
    <div className="Person">
      <p onClick={props.click}> Name: {props.name}</p>
      <p> City: {props.children}</p>
    </div>
  );
};

export default Person;