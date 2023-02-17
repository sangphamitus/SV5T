const express = require("express");
const cors=require("cors");
const PORT= 5200|| process.env.PORT
const app=express();
app.use(cors());

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode)
      .send(err.messages);
}




app.listen(PORT,()=>console.log(`Server Listening on ${PORT}`));