const express =require("express");
const bodyparser =require("body-parser");
const path=require("path");
const app=express();
const axios=require("axios").default;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){

    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
  
  var  data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
      }
    ]
  }; 

   
    var jsonData=JSON.stringify(data);

    var options = {
      url:"https://us4.api.mailchimp.com/3.0/lists/5d38994717",
        method: "POST",
        headers: {
          Authorization: "auth c8bd3a0b604ce74c173ee9d8313bbbf4-us4",
        
        },  
         body: jsonData
      }

 

    axios(options)
    .then(function(response){
      if(response.statusCode==200) {  res.sendFile(__dirname + "/success.html")}
         
          else {res.sendFile(__dirname + "/failure.html")}
        }
    )
    .catch(function (error){
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    })
  
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){

    console.log("server is on");

});

