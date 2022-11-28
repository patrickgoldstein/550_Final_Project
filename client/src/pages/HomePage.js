import React, { useState } from 'react';
import {
  Table,
  Card,
  Pagination,
  Select
} from 'antd'


import '../assets/scss/card.scss'

import MenuBar from '../components/MenuBar';
import DisplayCards from '../components/DisplayCards';
import Login from '../components/Login'
import { getCorrectnessRateSubject, getCorrectnessByUser, getWeaknessStrength, getCorrectnessRateQuestion } from '../fetcher'
import LoginForm from '../components/LoginForm';
import Button from '../components/Button'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


let weakness = "Enter UserID";
let strength = "Enter UserID";


class HomePage extends React.Component {

  state = {
    weaknessStrength: [],
    correctnessBySubject: [],
    pagination: null,
    userID: 0,
    authentication: false,
  }
  constructor(props) {
    super(props)
//In JS, functions are objects. They have methods, such as bind.
//Bind method returns new instance of addLoginHandler function.
//In the function, this references current instance.

//this.addLoginHandler is set to new instance of method returned by bind method 

   this.addLoginHandler= this.addLoginHandler.bind(this);

   this.goToTest = this.goToTest.bind(this);

   this.updateWeaknessStrength = this.updateWeaknessStrength.bind(this);

   this.loadData = this.loadData(this);
  }

  
  componentDidMount() {


    getWeaknessStrength(this.state.userID).then(res => {
      //console.log(res.results)
      this.setState({ weaknessStrength: res.results })
      // TASK 1: set the correct state attribute to res.results
    })

    getCorrectnessRateSubject().then(res => {
      this.setState({ correctnessBySubject: res.results })
    })

  }

  componentDidUpdate(prevProps, prevState){

    console.log("prevprop", prevProps);
    console.log("prevstate", prevState);

    if (this.state.userID !== prevState.userID){
      getWeaknessStrength(this.state.userID).then(res => {
        //console.log(res.results)
        this.setState({ weaknessStrength: res.results })
        // TASK 1: set the correct state attribute to res.results

        if (this.state.weaknessStrength[0] !== undefined){
          weakness = this.state.weaknessStrength[0].MinCorrectSubject;
          strength = this.state.weaknessStrength[0].MaxCorrectSubject;
        }

     
      })

    }

  }
  addLoginHandler(loginData) {
   this.setState({userID: loginData.userID });

   this.updateWeaknessStrength();
}

updateWeaknessStrength() {
  getWeaknessStrength();
}

goToTest() {
  window.location = `/test?id=${this.state.userID}`;
}


loadData() {

  if (this.state.weaknessStrength.length == 0){
    return "Waiting for UserID Input"
  }
  else{
    return this.state.weaknessStrength.MinCorrectSubject;
  }
};

  render() {
     
    return (


      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        </div>

        <div>
        </div>


        <div className="wrapper">
          <div><DisplayCards title="User ID" textBody={this.state.userID} /> </div>

          <div><DisplayCards title={strength} textBody="Strongest Subject" /> </div>


          <div><DisplayCards title={weakness} textBody="Weakest Subject" /> </div>

          <Login authentication = {this.state.authentication}/>

          <LoginForm onLogin = {this.addLoginHandler}/>


          <button onClick= {this.goToTest}>Click here to test!</button>



        </div>



      </div>


    )
  }

}

export default HomePage

