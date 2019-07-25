let express = require('express');
require('dotenv').config()
let app = express();
let userController = require('./controllers/userController');
let twitController = require('./controllers/twitController');
let sequelize = require('./db');
let bodyParser = require('body-parser');

sequelize.sync();
app.use(bodyParser.json())
app.use(require('./middleware/headers'));


app.get('/', (req,res) =>{    
    
    res.send('Online');
})


app.use('/user', userController);
app.use('/api',twitController);

app.use(require('./middleware/validate-session'));



app.get('/api/postTweets',(req,res)=>{
    res.send('postTweets endpoint working')
})

app.get('/favorites',(req,res)=>{
    res.send('favorites endpoint working')
})


app.listen(3000);

