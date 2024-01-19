import Express from "express";
import dotenv from 'dotenv'
import cors from 'cors'


import { dbConnect } from "./db/dbConnect.js";

import { loginRoute } from "./routes/auth/login.js";
import { registerRoute } from "./routes/auth/register.js";
import { resetPasswordRoute } from "./routes/auth/reset.js";
import { forgotPassRoute } from "./routes/auth/forgotpass.js";
import { productsRoute } from "./routes/products/products.js";
// import { getContactsRoute } from "./routes/chat/contacts.js";
// import { messageRouter } from "./routes/chat/message.js";
// import { profileRouter } from "./routes/chat/profile.js";


dotenv.config()

const port = process.env.PORT || 7050;

await dbConnect()

const app = Express()
 


app.use(cors())

app.use(Express.json())

app.use('/login', loginRoute)

app.use('/register', registerRoute)

app.use('/forgot', forgotPassRoute)

app.use('/reset', resetPasswordRoute)

app.use('/products', productsRoute)

// app.use('/messages', messageRouter)

// app.use('/profile', profileRouter)




app.get('/', (req,res)=>{
    res.send('Store Application')
})


// io.on('connection', (Socket) => {
//     // io.on('join-room', (data) =>{
//     //     Socket.join(data)
//     //     console.log(`user ${Socket.id} has joined the room`)
//     // })
//     console.log('user connected')
//     io.on('send-message', (data) =>{
//         console.log('Message', data)
//         io.emit('received-message', data)
//     })
//     io.on('disconnect', ()=>{
//         console.log('Disconnected')
//     })
// })





app.listen(port, ()=> console.log('server is running on', port))