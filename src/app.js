require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const Register = require("./models/users");
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const connectDb = require("./db/conn");
const {json} = require("express");
const { log } = require("console");
const BASE_URL= process.env.BASE_URL;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res)=>{
    res.render("index");
})

app.get("/register", (req,res)=>{
    res.render("register");
})

app.get("/login", (req, res)=>{
    res.render("login");
})

//register user in database
app.post("/register",async(req, res)=>{
    try{
        
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if(password === cpassword){

        const users = new Register({
            username: req.body.username,
            email: req.body.email,
            bio:req.body.bio,
            number:req.body.number,
            password: req.body.password,
            cpassword: req.body.cpassword,
        });

     const registered =  await users.save();
        res.status(201).render("index");
    }else{
        res.send("Password doesn't match!");
    }

    }catch(error){
        res.status(400).send(error);
    }
})




//login
app.post("/login", async(req, res)=>{
try{
    const email = req.body.email;
    const password = req.body.password;

   const useremail = await Register.findOne({email:email});
    
   if(useremail.password === password){
    res.status(201).render("index");
   }else{
    res.send("Invalid email or password!");
   }

}catch(error){
    res.status(400).send("Invalid email or password!")
}
})


connectDb().then(()=>{
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
});
    