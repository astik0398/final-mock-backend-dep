const {userModel} = require('../model/user.model')
const express = require('express')
const userRouter = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.post('/register', async(req, res)=> {
    try {
        const {email} = req.body
        const user = await userModel.findOne({email})

        if(user){
            res.send({"message": "user already exists, please log in"})
        }

        else{
            bcrypt.hash(req.body.password, 5, async(err, hash)=> {
                if(hash){
                    const user = new userModel({
                        username: req.body.username,
                        avatar: req.body.avatar,
                        email: req.body.email,
                        password: hash,
                    })

                    await user.save()
                    res.send({"message": "user has been registered successfully"})
                }
            });
        }
    } catch (error) {
        res.send(error)
    }
})

userRouter.post('/login', async(req, res)=> {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})

        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token = jwt.sign({userId: user._id}, "revision")
                    res.send({"message": "log in success", "token": token})
                }
                else{
                    res.send({"message": "invalid credentials !"})
                }
            })
        }
    } catch (error) {
        res.send({"message": error})
    }
})


module.exports = {
    userRouter
}