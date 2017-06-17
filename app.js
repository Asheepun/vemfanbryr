const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/index.html");
});

const io = require("socket.io")(server);

const txts = [""];

io.on("connection", socket => {
    console.log(socket.id + " has connected!");

    let data = {
        txts: txts,
    }

    socket.emit("start", data);

    socket.on("txt", data => {
        if(data.txt != txts[txts.length-1 && data.txt != " "]){
            txts.push(data.txt);
            console.log(txts);
        }
    });
});