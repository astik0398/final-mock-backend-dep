const express = require('express')
const app = express()
require('dotenv').config()
const {connection} = require('./db')
const {userRouter} = require('./routes/user.route')
const {blogRouter} = require('./routes/blog.router')

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/api', userRouter)
app.use('/post', blogRouter)
app.listen(process.env.port, async()=> {
    try {
        await connection
        console.log('connected to the db');
        console.log(`server running on port ${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
})