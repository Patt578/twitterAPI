import React from 'react';
import './Logout.css';
import { Button } from 'reactstrap';

const Logout = (props) =>{

    return(
        <div> 
            <Button color="primary" onClick={()=> props.clearToken(props.sessionToken)} alt="log" id="logout" className="logout">Logout</Button>
             
             </div>
    )

}

export default Logout;