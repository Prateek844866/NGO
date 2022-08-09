const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")


const encoder = bodyParser.urlencoded()
const app = express()
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"prateekanojia20024@gmail.com",
        pass:"hvqmavwcvfdgysob"
    }
})

app.set("view engine","hbs")
app.use(express.static(path.join(__dirname,"./views/public")))
hbs.registerPartials(path.join(__dirname,"./views/partials"))

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/services",(req,res)=>{
    res.render("services")
})
app.get("/help",async(req,res)=>{
    try{
        const data = await Children.find()
        res.render("help",{data:data})
    }
    catch(error){
        res.render("help")
    }
})
app.get("/profilechild",(req,res)=>{
    res.render("profilechild")
})
app.get("/profilengo",async(req,res)=>{
    try{
        const data = await Childrenngo.find()
        res.render("profilengo",{data:data})
    }
    catch(error){
        res.render("profilengo")
    }
})
app.get("/profilepatron",async(req,res)=>{
    try{
        const data = await Childrenpatron.find()
        res.render("profilepatron",{data:data})
    }
    catch(error){
        res.render("profilepatron")
    }
})
app.get("/loginpatron",(req,res)=>{
    res.render("loginpatron")
})
app.post("/loginpatron",(req,res)=>{
    res.render("profilepatron")
})
app.get("/loginngo",(req,res)=>{
    res.render("loginngo")
})
app.post("/loginngo",(req,res)=>{
    res.render("profilepatron")
})
app.get("/registerchild",(req,res)=>{
    res.render("registerchild")
})
app.get("/registerpatron",(req,res)=>{
    res.render("registerpatron")
})
app.get("/registerngo",(req,res)=>{
    res.render("registerngo")
})
app.get("/contact",(req,res)=>{
    res.render("contact",{"show":false})
})
app.post("/contact",encoder,(req,res)=>{
    let mailOption = {
        from:"prateekanojia20024@gmail.com",
        to:req.body.email,
        subject:"Your Query Received!!! : Team Company",
        text : "Thanks to Share Your Query with Us!!!\nOur team Will Contact Your Soon\n"
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
    mailOption = {
        from:"prateekanojia20024@gmail.com",
        to:"hvqmavwcvfdgysob",
        subject:"Query Received!!! : Team Company",
        text : `
            Name :  ${req.body.name}
            Email :  ${req.body.email}
            Phone :  ${req.body.phone}
            Subject :  ${req.body.subject}
            Message :  ${req.body.message}
        `
    }
    transporter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error);
    })
    res.render("contact",{"show":true})
})

app.get("/post",(req,res)=>{
    res.render("post")
})

app.listen(8000,()=>{
    console.log("Server is Running at PORT 8000...");
})