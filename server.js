const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get('/',(req,res)=>{
    res.send('Server is running')
})





const PORT = process.env.PORT || 8000

const server = app.listen(PORT,()=>[
    console.log('connected')
])


const io = require('socket.io')(server,{
    cors:{
        origin:"*"
    }
})

io.on('connection',(socket)=>{
    console.log('connected socket io')
    socket.on('setup',(mssg)=>{
        console.log(mssg.id,'id received')
       socket.join(mssg.id)
       socket.emit('connected',{
        message:'connection done'
       })
    })
    socket.on('message',(newMessage)=>{
        console.log(newMessage,'received message')
        const sendMessage = newMessage.message
        const id = newMessage.userId
        socket.in(id).emit('received',sendMessage)
    })
})