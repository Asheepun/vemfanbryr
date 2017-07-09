const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://test:test@ds032887.mlab.com:32887/vem-fan-bryr-sig");

const schema = new mongoose.Schema({
    text: String,
});

const text = mongoose.model("text", schema);

module.exports = app => {

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        text.find({}).then(result => res.render("index.jade", {submits: getRev(result)}));
    });

    app.post("/", (req, res) => {
        if(req.body.text != ""){
            text(req.body).save().then(() => {
                text.find({}).then(result => res.render("index.jade", {submits: getRev(result)}))
            });
        }else text.find({}).then(result => res.render("index.jade", {submits: getRev(result)}));
    });

    app.get("/all", (req, res) => {
        text.find({}).then(result => res.render("view_all.jade", {submits: getRev(result)}));
    });

}

const getRev = arr => arr.filter(() => true).reverse();