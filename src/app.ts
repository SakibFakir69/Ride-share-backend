


import dotenv from 'dotenv'
dotenv.config();
import express, { Request, Response } from 'express'
import router from './routes';
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app =  express();

// middleware
app.use(express.json());  // plain text convert to json 


app.use(cookieParser());


// cors 

const allowedOrigins = [
  "http://localhost:5173", // local dev
"https://ride-bha-2-2s04lf3pl-sakibfakirs-projects.vercel.app",
  "https://ride-bhai.netlify.app" // Netlify frontend (if any)
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // important for cookies
}));
// route

app.use('/api/ride-share',router);





// test route
app.get('/', async (req:Request , res:Response)=>{
    res.send(' server running')
})

export default app;
// we can this one time in file




