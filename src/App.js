import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchTweet from './Components/splash/SearchTweet'
import Auth from './Components/Auth/Auth';
import Navbar from './Components/navbar/nav/Navbar';

function App() {

  const [sessionToken, setSessionToken] = useState(undefined); 
  const [savedTweets,setSavedTweets] = useState(0);

  const viewConductor = () => {
    return (sessionToken !== undefined || null) ? <SearchTweet setSavedTweets={setSavedTweets} token={sessionToken}/>: <Auth updateToken = {updateToken}/> 
  }

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(newToken);
  }
  const clearToken = (token) => {
    console.log(localStorage.getItem(sessionToken))
    localStorage.clear(token);
    setSessionToken(undefined);
    viewConductor();
  }


  return (
    <div className="App">
      <Navbar clearToken={clearToken} sessionToken={sessionToken} savedTweets={savedTweets}></Navbar>
      {viewConductor()}
      
  
    </div>
  );
}

export default App;
