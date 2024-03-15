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

app.get('/create', (req, res) => {
    res.render('create.ejs')
})
app.post('/submit', (req,res) => {
    res.render('create.ejs')
})




app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
})