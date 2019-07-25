import React, {useState} from 'react';
import './Auth.css';

const Signup = (props) =>{

    

    const [email,setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [cPassword,cSetPassword] = useState('');

    const comparePasswords = (e) =>{
        e.preventDefault();
        if(password === cPassword){
            props.handleSubmit(email,password,username)
        }else{
            console.log('nope')
        }       
    }
   
return(
<div id="signup">
    <form onSubmit={comparePasswords} className="cardLike">
    <h1>Signup</h1>
    <label htmlFor="email">Email:</label>
    <br/>
    <input type="text" name="" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <br/>
    <label htmlFor="username">Username:</label>
    <br/>
    <input type="text" name="" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
    <br/>
    <label htmlFor="password">Password:</label>
    <br/>
    <input type="password" id="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
    <br/>
    <label htmlFor="cpassword">Confirm Password:</label>
    <br/>
    <input type="password" id="cpassword" value={cPassword} onChange={(e) =>cSetPassword(e.target.value)}/>
    <br/>
    <br/>
    <button type='submit'>Submit</button>
    
    </form>
   
</div>
)
}

export default Signup;