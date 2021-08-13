const express = require("express");

//creating express application
const app = express();

//creating port
const port = process.env.PORT || 5000;

//adding the static folder to server
app.use(express.static(__dirname));
app.use(express.static("public"));

//listening to the port
app.listen(port, () => console.log("server is running at port " + port));
