/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';

const Cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js][FUNCTIONAL] useEffect', props);
    setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000)
  },[]);
  
  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };
  
  return(
    <div>
      <button
        style={style}
        onClick={() => props.toggle()}>Toggle Persons</button>
    </div>
  )
};

export default Cockpit;
