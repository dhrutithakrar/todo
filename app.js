const express=require("express");
const bodyParser=require("body-parser");

const app=express();

let items=["Buy Food","Cook Food","Eat Food"];
let workitems=[];
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    let today=new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"

    };
    let day=today.toLocaleDateString("en-US",options);
    res.render("list",{listTitle : day,NewListItems: items});
    
});
app.post("/",function(req,res){
    let item=req.body.newitem;
    if(req.body.list ==="Work"){
        workitems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List",NewListItems:workitems});
});

app.listen(3000,function(){
    console.log("Server start at port 3000");
});