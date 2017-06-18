const express = require("express");
const fs = require("fs")
const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/index.html");
});

const io = require("socket.io")(server);

io.on("connection", socket => {
    let data = {
        last: fs.readFileSync("text.txt", "utf8"),
    }

    socket.emit("start", data);

    socket.on("txt", data => {
        fs.writeFileSync("text.txt", data.txt, "utf8");
        io.sockets.emit("update");
    });
});