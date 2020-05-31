import React from 'react';
import "./Card.css"

function Card({item, changeAvailability, deleteBook}) {
  return (
    <div className="card" >
        <p>{`${item.title}: ${item.available ? 'Available' : 'Not Available'}`}</p>

        <div>
          <button onClick={(e) => {
              changeAvailability({
                  variables: { id: item.id, available: !item.available }
              })
          }}> 
              Change Availability 
          </button>
          <button onClick={(e) => {
              deleteBook({
                  variables: { id: item.id}
              })
          }}> 
              Delete
          </button>
        </div>
    
    </div>
  );
}

export default Card;
