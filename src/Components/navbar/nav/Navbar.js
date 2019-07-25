import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
 } from 'reactstrap';
import Logout from '../Logout/Logout';
import pic from '../../../assets/twitter.png'
import './Navbar.css';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';



  const Navbarr = (props)=>{

    
const StyledBadge = withStyles(theme => ({
  badge: {
    top: '30%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge);

    return (
    
      <div id="navbar">
        <div>
        <Navbar color="light" light expand="md">
      <NavbarBrand href="http://localhost:3001"><i>Save that Tweet!</i></NavbarBrand>
          <Collapse isOpen={true} navbar>
          <img src={pic} width='40px' id='twitPic'/>
            <Nav className="ml-auto" navbar>
            <IconButton aria-label="Cart">
      <StyledBadge badgeContent={props.savedTweets} color="primary">
        
              </StyledBadge>
    </IconButton>
              <NavItem>
                <NavLink href="https://github.com/Patt578">GitHub</NavLink>
              </NavItem>
              <NavItem>
              <Logout clearToken={props.clearToken} sessionToken={props.sessionToken}/>
             
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
 
        </div>

    );
    
  }
export default Navbarr;
  
