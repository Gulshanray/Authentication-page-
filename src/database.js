const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/student').then(()=>{
    console.log('connect successfully')
}).catch((error)=>{console.log(error)})

Schema = mongoose.Schema({
    uname:String,
    pass: String,
 
})
console.log('schema created')


StudentModel = mongoose.model('student',Schema)
module.exports =StudentModel