//import the framework package 
const express = require('express');
//bch nzid DB Mongoose tab3a l mongoDB
const mongoose = require("mongoose");
//t3awen serveur bch ya9ra ay request
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// lexpress feha les methodes ali ta3ml les requests w response ben server wl client
const app = express();
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Fruits');

//hadhi model yetkawen mn name de type string
const Fruit = mongoose.model('Fruit', { name: String });

//9bal mand5 base donnee est3mlt liste
//let fruits = ["apple", "strawberry", "manga"]
// instantier objet esmou app ml express
// bch nsta3ml les methodes crud 
//get
//3ndi path ali w9tli na3ml lien tsirli fih methode crud
// l '/' hia l root page 
// l app.get ==> wa9tli l client tlab l path hedha a3mli akl function
app.get('/sahar', function (req, res) {
    res.send("Welcome to our project");
})
//get bl liste
app.get('/api/fruits', (req, res) => {
    // res.json(fruits); fl cas mta3 liste
    Fruit.find().then(function (fruits) {

        res.json(fruits);
    })
        .catch(function (err) {
            console.log(err);
        });
})
//modify elements
app.put('/api/fruits/update/:_id', (req, res) => {
    const id = req.params._id;
    console.log(id);
    Fruit.findByIdAndUpdate(id, { name: req.body.name }).then(function () {
        res.send("data modified succesfuly");
    }).catch(function (err) {
        console.log(err);

    });

}
)


// app.put('/api/fruits/update/:_id', (req, res) => {
//     const id = req.params._id;
//     console.log(id);
//     Fruit.findByIdAndUpdate(id, { name: req.body.name })


// }
// )

//delete elements
app.delete('/api/fruits/remove/:_id', (req, res) => {
    const id = req.params._id;
    Fruit.findByIdAndDelete(id).then(() => {
        //() => hia nafsha function()
        res.send("data deleted succesfully");
    })
        .catch(function (err) {
            console.log(err);
        })
})


app.post('/api/fruits/create', (req, res) => {
    const fruit = new Fruit({ name: req.body.name })
    fruit.save().then(() => {
        res.send('data added succesfully');
    })
})

//listen 7atet l port 3000 lil server local
// theni parametre t5dm  if else kan mchet rahi else direct mn8er if , najm n9olou print message
app.listen(3000, () =>
    console.log('server is up on port 3000'));