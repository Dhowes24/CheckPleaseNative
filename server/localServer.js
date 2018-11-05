const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const Router = require("./expressRoute");

let app = express();
let port = 3000;

app.listen(port, function () {
    console.log("Server running on port", port);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ejs);
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/image-upload", Router);