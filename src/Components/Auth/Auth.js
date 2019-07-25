import React, {useState} from 'react';
import './Auth.css';
import Signin from './Signin';
import Signup from './Signup';
import APIURL from '../../helpers/enviorment';
import background from '../../assets/background.png';


const Auth = (props) =>{

    let style = {
        backgroundImage: `url(${background})`
    }

    const [login,setLogin] = useState(false);

    const handleSubmit = (email,password,username) =>{
        const url = login ? APIURL+'/user/signin':APIURL+'/user/signup';
        console.log(url)
        const bodyObj = login ? {
            email: email,
            username:username,
            password: password
        }:{
            email: email,
            username: username,
            password: password
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyObj),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => props.updateToken(json.sessionToken))
        .catch(err => console.log(err))   
       
    
    }

    return(
    <div id="authWrapper" style={style}> 
    <div className="infoText">
        <h3>What is this place?</h3>
    <p>Welcome to Save That Tweet! This is a web application that allows you to browse through available tweets on twitter and save indivdual ones with customized notes! This applicaton utilizes twitter's very powerful API which I have brought to you in a full stack react app!
    </p>
    </div>
        <Signin handleSubmit={handleSubmit} login={login} setLogin={setLogin}/>
        <Signup handleSubmit={handleSubmit}  />

        
    </div>
    )
}
export default Auth;