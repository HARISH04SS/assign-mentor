const app = require('./app')

const mongoose = require('mongoose');
const {mongoDB_URL,port} = require('./utils/config');



mongoose.connect(process.env.mongoDB_URL).then(()=>{
    console.log("connected to DB");
    app.listen(process.env.port,() =>{
        console.log('server is runing on http://127.0.0.1:${process.env.port}')
    });
}).catch((error)=>{
    console.log("error in connection: ",error);
});