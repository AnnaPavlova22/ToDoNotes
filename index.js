import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// To calculate the current date
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const d = new Date();
let mm = months[d.getMonth()];
let dd = d.getDate();
let yyyy = d.getFullYear();
let day = days[d.getDay()];
const today = dd + ' ' + mm + ' ' + yyyy;

const toDoItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render('index', { items: toDoItems, date: today, weekday: day });
});

app.post("/", (req, res) => {
    const newItem = req.body.doItem;
    toDoItems.unshift({ text: newItem, crossedOut: false });
    res.redirect("/");
});

app.post("/toggle", (req, res) => {
    const index = parseInt(req.body.index, 10);
    if (index >= 0 && index < toDoItems.length) {
        toDoItems[index].crossedOut = !toDoItems[index].crossedOut;
    }
    res.redirect("/");
});

app.delete ("/", (req, res) => {
    const toDoItems = [];
})


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

