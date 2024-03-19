import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [
{
    id: 1,
    title: 'Dummy 1 story',
    message: 'dummy1 Hello',
    author: 'dummy1'
},
{
    id: 2,
    title: 'Dummy 1 story',
    message: 'dummy2 Hello',
    author: 'dummy2'
}
]


app.get('/', (req,res) => {
    res.render('index.ejs', {posts})
})
//Don't know if I will use this route
app.get('/about', (req, res) => {
    res.render('about.ejs')
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

app.get('/edit/:id', (req, res) => {
    // console.log(req.params.id)
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id)
    res.render('edit.ejs', {post})
})

        
app.post('/edit/:id', (req,res) => {
    console.log(req.params.id)
    const postID = req.params.id
    res.render('post.ejs', {postID})
 })







app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
})