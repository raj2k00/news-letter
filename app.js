const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",function (req,res) {
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function (req,res) {
  var firstName = req.body.first_name;
  var lastName = req.body.last_name;
  var email = req.body.email;

  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options ={

    url :"https://us17.api.mailchimp.com/3.0/lists/e23d635450",
    method :"POST",
    headers :{
      "Authorization":"mohan d385a29e0d8cee1cc0408e3dd600c120-us17"
        },
    body : jsonData
  };

  request(options,function(error,response,body){
    if(error){
      res.sendFile(__dirname+"/failure.html");
    }else{
      if(response.statusCode === 200){
           res.sendFile(__dirname+"/success.html");
      }
      else{
            res.sendFile(__dirname+"/failure.html");
      }
      //console.log(response.statusCode);
    }
  });
});
app.post("/failure.html",function (req,res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function (){
  console.log("server started on port 3000");
});
//e23d635450
