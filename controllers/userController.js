const router = require('express').Router();

const User = require('../db').import('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let tempTweetArry= [];

router.post('/signup',(req,res)=>{

    let username = req.body.username;
    let pass = req.body.password;
    let email = req.body.email;
  
    User.create({
        username:username,
        password: bcrypt.hashSync(pass,10),
        email:email
    })
    .then(
        createSuccess = (user) =>{
            let token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:60*60*24})
            res.json({
                user:user,
                message:'User created',
                sessionToken: token
            })
        }
    )
    .then(createError = err => res.send(500, err)
    )
})


router.post('/signin',(req,res)=>{
    User.findOne({where:{email:req.body.email}})
        .then(user =>{
            if(user){
                bcrypt.compare(req.body.password, user.password,(err,matches)=>{
                    if(matches){
                        let token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: 60*60*24})
                        res.json({
                            user:user,
                            message:'successfully authenticated',
                            sessionToken: token

                        })
                    }else{
                        res.status(502).send({error:'Bad gateway'})
                    }

                })
            }else{
                res.status(500).send({error:'Failed to authenticate'})
            }
        },
        err => res.status(501).send({error:'failed to process'})
        )
})
module.exports = router; 