import DisplayCards from "./DisplayCards";
import Card from './Card';
import classes from './LoginForm.module.css';

import {useRef} from 'react';
function LoginForm(props){

    const userIdInputRef = useRef();
    //create additional refs for password, username, etc




    function submitHandler(event){
        //prevents default behavior of browser communicating with server
        event.preventDefault();

        const enteredUserId = userIdInputRef.current.value;


        const loginData = {
            userID: enteredUserId,
        };
        props.onLogin(loginData);
    }

    return <Card>
        <form className = {classes.form} onSubmit ={submitHandler}>
            <div className={classes.control}>
                <label htmlFor = "userID"> UserID</label>
                <input type="text" required id="userID" ref={userIdInputRef} />
            </div>
            <div className={classes.actions}>
                <button>Enter</button>
            </div>
            
        </form>
    </Card>
    

}

export default LoginForm;