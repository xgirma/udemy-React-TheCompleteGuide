import React from 'react';

const UserInput = props => {
  return (
    <div>
      <input type="text" onChange={props.changed}/>
    </div>
  )
};

export default UserInput;