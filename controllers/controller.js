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
        text(req.body).save().then(() => {
            text.find({}).then(result => res.render("index.jade", {submits: getRev(result)}))
        });
    });

}

const getRev = arr => {
    let a = arr.filter(() => true);
    a.reverse();
    return a;
}