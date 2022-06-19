const config = require("./config.json");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// middleware configration 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
//app.use("/uploadsFile", express.static(path.join(__dirname , 'uploadsFile')));

// db connection
mongoose.connect(config.MONGO_URL).then((data)=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("no connection");
})

// routes
app.use("/api/fileRoutes", require("./routes/fileuploadRoutes"));
const port = config.PORT || 8002;
app.listen(port,()=>{
    console.log(`Server is runninng on the:${port}`);
})