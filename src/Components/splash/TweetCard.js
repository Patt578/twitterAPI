import React, {useState}from 'react';
import './searchTweet.css';
import rt from '../../assets/rt.png'
import like from '../../assets/like.png';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '../../assets/add.png';
import DeleteIcon from '../../assets/delete.png';
import { Button } from '@material-ui/core';
import APIURL from '../../helpers/enviorment';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

const useStyles1 = makeStyles(theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  customWidth: {
    maxWidth: 40,
  },
}));


const TweetCard = (props) =>{
   
  const classes1 = useStyles1();
  const classes = useStyles();
  const [comments,setComments] = useState('');
  const [favs, setFavs] = useState([]);
  


    return (
     
      props.tweets.map((x)=>{

        const deleteTweet = (e) =>{
          e.preventDefault();
          const url = APIURL+ '/api/delete/' +x.id;

          fetch(url,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
              'Authorization': props.token
            }
          })
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log(err))   

        }

        const updateTweet = (e) =>{
          e.preventDefault();
          const url = APIURL+'/api/update/' +x.id;

          fetch(url,{
            method: 'PUT',
            body: JSON.stringify({
              comments:comments
            }),
            headers:{
                'Content-Type': 'application/json',
              'Authorization': props.token
            }
          })
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log(err))   

        }

        const favTweet=(e) =>{
          e.preventDefault();
         
          const url = APIURL+'/api/saveTweet'
        
          const bodyObj = {  
            date:x.createdAt,
            username:x.username,
            description:x.text,
            comments:comments,
            retweets:x.retweetCount,
            likes:x.favoriteCount
        
          }
        
          fetch(url, {

              method: 'POST',
              body: JSON.stringify(bodyObj),
              headers:{
                  'Content-Type': 'application/json',
                'Authorization': props.token
              }
          })
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log(err))   
        }
        
        
        x.createdAt = x.createdAt.substr(0,10);
       

        return(
        <div className="tweetCard">
          <div className='cardHeader'>
           

          <div className="toolTipContainer">
          <div className="addTip" >
      <Tooltip title="Add" aria-label="Add">
        <Fab color="primary" className={classes1.fab} onClick={favTweet} width="32" height="32">
         <img src={AddIcon} maxWidth="32" height="32"/>
        </Fab>
      </Tooltip>
      </div>
            <div className="deleteTip"> 
          <Tooltip title="Delete" >
        <IconButton aria-label="Delete" onClick={deleteTweet}>
        <img src={DeleteIcon} width="24" height="24"/>
        </IconButton>
      </Tooltip>
      </div>
      
      </div>

          <p><b>{x.username}</b> @{x.screenName} · {x.createdAt}</p>
          </div>
          <hr/>
          <p>{x.text} {x.description}</p>
          <p><img src={rt} width="24" height="24"/>{x.retweetCount} {x.retweets}
          <img src={like} width="24" height="24"/> {x.favoriteCount} {x.likes}</p>
        
          <TextField
        id="outlined-multiline-static"
      
        multiline
        rows="2"
        defaultValue=""
        className={classes.textField}
        margin="normal"
        variant="outlined"
        className="textBox"
        placeholder={x.comments}
        onChange = {(e)=>setComments(e.target.value) }
      />

      <Button onClick={(e)=>updateTweet(e)}>Update</Button>
        </div>
        
         
        )
        
      })
    )
  }

  export default TweetCard;