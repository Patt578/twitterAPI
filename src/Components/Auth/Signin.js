import React, {useState} from 'react';
import './Auth.css';


const Signin= (props) =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');

    const signinHandler = (e) =>{
        e.preventDefault();
        setUsername(email);
        props.setLogin(true);
        props.handleSubmit(email,password,username);

    }


return(
    <div id="signin">
    <form onSubmit={signinHandler} className="cardLike">
    <h1>Login</h1>
    <label htmlFor="email">Email/Username:</label>
    <br/>
    <input type="text" name="" id="email1" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <br/>
    <label htmlFor="password">Password:</label>
    <br/>
    <input type="password" id="password1" value={password} onChange={(e)=> setPassword(e.target.value)}/>
    <br/>
    <br/>
    <button type='submit'>Submit</button>
    </form>
</div>
)
}


export default Signin;