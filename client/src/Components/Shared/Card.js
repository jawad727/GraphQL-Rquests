import React from 'react';
import "./Card.css"

function Card({item, changeAvailability}) {
  return (
    <div className="card" >
        <p>{`${item.title}: ${item.available ? 'Available' : 'Not Available'}`}</p>

        <button onClick={(e) => {
            changeAvailability({
                variables: { id: item.id, available: !item.available }
            })
        }}> 
            Change Availability 
        </button>
    
    </div>
  );
}

export default Card;
