import React from 'react';

import '../assets/scss/card.scss'

function DisplayCards(props) {

  return (
   
      <div className='card' style={{ width: 300 }}>

        <div class="col d-flex justify-content-center">


          <div class="card-body">
            <h2 class="card-title">{props.title}</h2>
            <p class="card-text">{props.textBody}</p>

          </div>


        </div>

      </div>





  );

}

export default DisplayCards;