const bodyParser = require("body-parser");
const express = require("express");
const https = require("https"); 
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");  
})

app.post("/" ,function(req,res){
    const city = req.body.cityName;
    const unit = req.body.Unit;
    
    
    const URL ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid=f0d1e6ec9cd52ff5f9b070e44904443d"
    https.get(URL,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const des = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const iconurl = "https://openweathermap.org/img/wn/"+ icon+"@2x.png";
            res.write("<p>The weather is currently " + des+ "<p>");
            res.write("<h1>The current temprature in your city " +city+ " is "  +temp+ "<h1>");
            res.write("<img src="+iconurl+ ">");
            res.send();
            
        })
    });
})




app.listen(5005 , function(){
    console.log("Server is running on 5005");
})

