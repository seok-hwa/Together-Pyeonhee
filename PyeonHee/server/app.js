const express = require("express");
const app = express();

app.get("/welcome", function(req, res){
    res.send("Welcome");
});

const PORT = 8000;
app.listen(PORT, function(){
    console.log("Server is ready at "+ PORT);
});