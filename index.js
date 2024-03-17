import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res) => {
    res.render('index.ejs')
})
//Don't know if I will use this route
app.get('/about', (req, res) => {
    res.render('about.ejs')
})

app.get('/edit', (req, res) => {
    res.render('edit.ejs')
})

app.get("/create", (req, res) => {
    res.render("create.ejs")
})
app.post("/submit", (req,res) => {
    // console.log(req.body["message"])
    const text = req.body["message"]
    const writer = req.body["author"]
    res.render('index.ejs', {message: text, author: writer})
})
//look up id         
// app.put()




app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
})