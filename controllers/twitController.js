const router = require('express').Router();
const Tweet = require('../db').import('../models/tweets');
let Twit = require('twit');
require('dotenv').config();

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
  

router.get('/searchTweets/:info/display/:amount',(req,res)=>{
    let info = req.params.info;
    let amount = req.params.amount;
    let tempTweetArry = [];
          if(info == '' || amount == ' '){
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
            let tempObj = {
                username: '',
                screenName:'',
                createdAt:'',
                text:'',
                retweetCount: 0,
                favoriteCount: 0
            }

              tempObj.username = tweetData[i].user.name;
              tempObj.screenName = tweetData[i].user.screen_name;
              tempObj.createdAt = tweetData[i].created_at;
              tempObj.text = tweetData[i].text;
              tempObj.favoriteCount = tweetData[i].favorite_count;
              tempObj.retweetCount = tweetData[i].retweet_count;
    
              tempTweetArry[i] = tempObj;
       
            }
            res.json(tempTweetArry);
      }
});


router.post('/saveTweet',(req,res)=>{

    
    let date = req.body.date;
    let username = req.body.username;
    let description = req.body.description;
    let owner = 1;
    let comments = req.body.comments;
    let likes = req.body.likes;
    let rts = req.body.retweets;

    Tweet.create({
        date: date,
        username: username,
        description: description,
        comments:comments,
        likes:likes,
        retweets:rts,
        userID:owner
        
    })
    .then(
        createSuccess = (tweet)=>{
            res.json({
                tweet:tweet,
                message:'Tweet saved'
            })
        }
    )
    createError = err => res.send(500,err);
})

router.get('/displayTweets',(req,res)=>{
    let userid =1;
    
    Tweet.findAll({
        where: { userID: userid } 
    }).then(tweets =>{
        res.json(tweets);
        
    })


    
    
})

router.delete('/delete/:id', function(req, res) {
    var data = req.params.id;
    var userid = 1;
    Tweet
        .destroy({
            where: { id: data, userID: userid } 
        }).then(
            function deleteLogSuccess(data){ 
                res.status("you removed a tweet");
            },
            function deleteLogError(err){
                res.status(500, err.message);
            }
        );
});

router.put('/update/:id', function(req, res) {
    var data = req.params.id; 
    let comments = req.body.comments;

    Tweet
        .update({ 
            comments: comments 
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    comments: comments
                });            
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});


module.exports = router; 

