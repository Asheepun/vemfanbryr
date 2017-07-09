const express = require("express");
const controller = require("./controllers/controller.js");
const app = express();

app.set("view engine", "jade");
app.use(express.static("public"));

controller(app);

const port = process.env.PORT || 3000;

app.listen(port, err => {
    if(err) throw err;
    console.log(`Listening on ${port}!`);
});