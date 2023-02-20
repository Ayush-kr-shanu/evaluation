const express=require('express')
const { connection }=require('./db')
require('dotenv').config()

const cors=require('cors')

const {userRoute}=require('./router/user.routes')

const {authenticate}=require('./middleware/authentication.middleware')
const { postRouter } = require('./router/post.routes')

const app=express()

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    res.send('HOME PAGE')
})

app.use('/users',userRoute)

app.use(authenticate)

app.use('/posts',postRouter)

const port=process.env.port
app.listen(port,async()=>{
    try {
        await connection
        console.log('DB is conmnected');
    } catch (err) {
        console.log(err)
    }
})