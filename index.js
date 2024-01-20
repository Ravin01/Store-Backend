import Express from "express";
import dotenv from 'dotenv'
import cors from 'cors'


import { dbConnect } from "./db/dbConnect.js";

import { loginRoute } from "./routes/auth/login.js";
import { registerRoute } from "./routes/auth/register.js";
import { resetPasswordRoute } from "./routes/auth/reset.js";
import { forgotPassRoute } from "./routes/auth/forgotpass.js";
import { productsRoute } from "./routes/products/products.js";
import { normalUserRoute } from "./routes/products/NormalUser.js";


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

app.use('/normalUser', normalUserRoute)





app.get('/', (req,res)=>{
    res.send('Store Application')
})







app.listen(port, ()=> console.log('server is running on', port))