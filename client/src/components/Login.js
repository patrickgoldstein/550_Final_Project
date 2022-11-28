import React, {useState} from 'react';

import '../assets/scss/card.scss'
import {Modal} from "react-responsive-modal";
import Backdrop from './Backdrop'


function Login(props) {

    //useState always returns an array of two elements
    //first element is current snapshot
const[modalIsOpen, setModalIsOpen] = useState(false);

var login = (
    <form action="#" onSubmit={props.authentication}>
      <input
        type="userID"
        placeholder="UserID"
        value = "UserID" 

        />
        
      <input type="submit" />
    </form>
  );

  var contact = "good";

function deleteHandler(){
    setModalIsOpen(true);
}

function closeModalHanlder(){
    setModalIsOpen(false);
}



//in JS, with &&, if both are true, second is returned
  return (
   
    <div>
        
        {modalIsOpen && login}
        {modalIsOpen && <Backdrop onClick={closeModalHanlder}/>}

    </div>


  );

}

export default Login;