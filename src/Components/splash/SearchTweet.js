import React, {useState,useEffect} from 'react';
import './searchTweet.css';
import ReactPlayer from 'react-player';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,Form,FormGroup} from 'reactstrap';
import TweetCard from './TweetCard';
import background from '../../assets/background.png';
import APIURL from '../../helpers/enviorment';

const SearchTweet = (props) =>{
    const [tweet, setTweet] = useState([]);
    const [searchTweet,setSearchTweet] = useState('');
    const [amount,setAmount] = useState(0);


    let style = {
      backgroundImage: `url(${background})`
  }

    
    let defaultUrl = APIURL+'/api/searchTweets/dude/display/5';

    useEffect(() =>{
      fetch(defaultUrl)
        .then(res => res.json())
        .then(data =>{
          setTweet(data); 
        })
        .catch(err => console.log(err));   
      }, []
    )

    const loadFavorites=() =>{
    
      fetch(APIURL+'/api/displayTweets')
      .then(res=>res.json())
      .then(data =>{
        setTweet(data);
        displayTweets();
        console.log(data)
        console.log(tweet)
       
       
      })
      .catch(err => console.log(err))

    }

    const displayTweets=()=>{
      return (
          <div id="container">
              <TweetCard tweets={tweet} setSavedTweets={props.setSavedTweets} token={props.token}/>
          </div>
      )
    }
   
   
    const fetchData = () =>{
      if(searchTweet == '' || amount == ''){
        alert("please enter valid search parameters! >:(");
        return;
      }
      let url = APIURL+'/api/searchTweets/' + searchTweet +'/display/' + amount;
            fetch(url)
              .then(res => res.json())
              .then(data => {
                setTweet(data);
               
               
              })
              .catch(err => console.log(err));
            }

  

    return (
      <div style={style} id="searchTweet">
        <Form className="searchTweetHeader" >
        <FormGroup>
        <h2>Search by @, #, or tweet description</h2>
        Search:  <input type="search" placeholder='dude' className="search" onChange={(e)=>setSearchTweet(e.target.value)}/>
        
        Amount:  <input type="search" className="amountSearch" placeholder='5' size="2" className="search"onChange={(e)=>setAmount(e.target.value)}/>
        <br/>
        <br/>
        <Button color="primary" onClick={fetchData}>Search!</Button>
        <hr/>
        </FormGroup>
        </Form>
        <Button color="primary" onClick={loadFavorites}>Show my Favorites!</Button>
    
        <div id='container'>
        <TweetCard tweets={tweet} setSavedTweets={props.setSavedTweets} token={props.token} />
    
        </div>
      </div>
    );
  };
  
export default SearchTweet;
