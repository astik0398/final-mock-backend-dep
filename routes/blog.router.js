const {blogModel} = require('../model/blog.model')
const express = require('express')
const blogRouter = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { auth } = require('../middleware/auth.middleware')

blogRouter.use(auth)

blogRouter.get('/blogs', async(req, res)=> {
    try {
        const blog = await blogModel.find({userID: req.body.userID})
        res.send(blog)
    } catch (error) {
        res.send({"message": error})
    }
})

blogRouter.post('/blogs', async(req, res)=> {
    const {userID} = req.body

    try {
        const blog = new blogModel({
            ...req.body,
            userID,
            date: '2017-06-01'
        })

        await blog.save()
        res.send({"message": "blog has been posted successfully"})
    } catch (error) {
        res.send({"error": error})
    }
})

module.exports = {
    blogRouter
}