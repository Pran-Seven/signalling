const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
app.use(express.json())
app.use(cors({
    origin:'https://sevebhub-stable.web.app'
}))

app.get('/',(req,res)=>{
    res.send('Server is running')
})





const PORT = process.env.PORT || 5000

const server = app.listen(PORT,()=>[
    console.log('connected')
])


const io = require('socket.io')(server,{
    cors:{
        origin:'https://sevebhub-stable.web.app'
    }
})

io.on('connection',(socket)=>{
    console.log('connected socket io')
    socket.on('setup',(msg)=>{
       console.log(msg,'message from client')
    })
    socket.emit('message',{
        message:'Hello from server'
    })
})