import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const renderToys = (toys) => {
    return toys.map((toy,i)=><ToyCard likeToy={props.likeToy} donateToy={props.donateToy}key={i} {...toy}/>)
  } 

  return(
    <div id="toy-collection">
      {renderToys(props.toys)}
    </div>
  );
}

export default ToyContainer;
