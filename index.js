import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import indexRouter from './app.router.js'


const app = express();
const port = process.env.PORT;
const dbURL =process.env.DB_URL;
mongoose.connect(dbURL); 

const db = mongoose.connection;
db.on("error", console.log.bind("connection error:"));
db.once("open", ()=> {
    console.log("Database connected successfully!")
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/v1',indexRouter)


app.listen(port, (req, res)=> {
    console.log(`Server Is Running On Port ${port}`)
})