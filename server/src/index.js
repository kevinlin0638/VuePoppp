const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = "mongodb+srv://leo:410421283@cluster0.aojej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const popcatSchema = mongoose.Schema({
    country: String,
    click: Number
})

const popcatModel = mongoose.model('popcat', popcatSchema);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,PATCH,POST,GET,DELETE,OPTIONS");
    next();
});

app.get('/', function (req, res) {
    return res.send('Hello');
});

app.get('/user/:userId', function (req, res) {
    console.log(req.params.userId);
})

app.post('/user', function (req, res) {
    let person = {};
    person.name = req.body.name;
    person.age = req.body.age + 10;
    return res.send(person);
})

app.post('/popcat/country', function (req, res) {
    const yourCountry = new popcatModel({
        country: req.body.country,
        click: 0
    });

    yourCountry.save();
    return res.send(201);
})

app.patch('/popcat', async function (req, res) {

    const res = await popcatModel.updateOne({ country: req.body.country }, { $inc: { click: 1 } });
    console.log(res);
    return res.status(200).send('success');
})

app.listen(5000, function () {
    console.log('Server is running~');
});