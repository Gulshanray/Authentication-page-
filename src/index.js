const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const student = require('./database');

const bcrypt = require('bcrypt');
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");



app.get('/Home',(req,res)=>{
    res.render('Home')
})

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});




app.post('/', async (req, res) => {
    data ={
        uname: req.body.uname,
        pass: req.body.pass
    }
    const { uname, pass } = req.body;
    checkuser = await student.findOne({
         uname:req.body.uname
        })
    if(checkuser){
        const checkpass = await bcrypt.compare(req.body.pass,checkuser.pass);
        if(checkpass){res.redirect('/Home')}
        else{res.send('incorrect password')}
    }
else{res.send('username does  not exist')}
   
});





app.post('/register', async (req, res) => {
    const { uname, pass } = req.body;

    existinguser = await student.findOne({uname})
 if(existinguser){res.send('user already exists. Please try another  name ')}

    else{
        saltRounds = 10;
         encpass = await bcrypt.hash(pass, saltRounds);
         newStudent = new student({ uname, pass: encpass });
         savedStudent = await newStudent.save();}
        res.redirect('/register')
});






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





































































