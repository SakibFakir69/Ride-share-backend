


import dotenv from 'dotenv'
dotenv.config();
import express, { Request, Response } from 'express'
import router from './routes';


const app =  express();

// middleware
app.use(express.json());  // plain text convert to json 


// route

app.use('/api/ride-share',router);





// test route
app.get('/', async (req:Request , res:Response)=>{
    res.send(' server running')
})

export default app;
// we can this one time in file




