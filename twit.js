let Twit = require('twit');
require('dotenv').config()


let twitter = new Twit({
    consumer_key: process.env.TWIT_KEY,
    consumer_secret: process.env.TWIT_SECRET,
    access_token: process.env.TWIT_TOKEN,
    access_token_secret: process.env.TWIT_TOKEN_SECRET,
    timeout_ms:           60*1000,  
    strictSSL:            true,     
  })

   function postTweet(info){
      let tweet = {
          status: info
      }
      twitter.post('statuses/update',tweet,(err,data,response)=>{
          console.log(data);
      })
  }
  

  function getTweet(info,amount){
      if(info == '' || info == ' '){
          return console.log('cannot be blank')
      }
  let params= {
      q: info,
      count: amount
  }
  twitter.get('search/tweets',params,gotData);
  function gotData(err,data,response){
      let tweetData = data.statuses;
      for(let i = 0; i<tweetData.length;i++){
          console.log(tweetData[i].user.name)
          console.log(tweetData[i].user.screen_name)
          console.log(tweetData[i].created_at)
          console.log(tweetData[i].text);
          console.log('-------------------------------------------------------')
          
        }
      
  }
}
