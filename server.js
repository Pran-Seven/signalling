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
       socket.join(mssg.id)
       console.log(mssg.id,'message-id')
       socket.emit('connected',{
        message:`connection done with ${mssg.id}`
       })
    }) 
    socket.on('message',(newMessage)=>{
        console.log(newMessage,'new-mssg')
        const sendMessage = newMessage.message
        const id = newMessage.userId
        socket.in(id).emit('received',sendMessage)
    })
    socket.on('feedback_channel',(mssg)=>{
        
        socket.join(mssg.id)
        console.log(mssg.id,'message-id')
        socket.emit('connected',{
         message:`connection done with ${mssg.id}`
        })
     }) 
     const finalObj={}
     socket.on('feedback',(newMessage)=>{
         const name = Object.keys(newMessage?.Feedback)[0];
         finalObj[name]=newMessage?.Feedback[name]
         const id = newMessage.userId
         console.log(finalObj,'final-Obj')
         socket.in(id).emit('received',finalObj)
     })
})