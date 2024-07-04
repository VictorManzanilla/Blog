import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static('assets'));

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
},
{ id: 3, title: "Post 3", message: "Message 3", author: "Author 3" },
  { id: 4, title: "Post 4", message: "Message 4", author: "Author 4" },
  { id: 5, title: "Post 5", message: "Message 5", author: "Author 5" },
  { id: 6, title: "Post 6", message: "Message 6", author: "Author 6" },
  { id: 7, title: "Post 7", message: "Message 7", author: "Author 7" },
  { id: 8, title: "Post 8", message: "Message 8", author: "Author 8" }
]


app.get('/', (req,res) => {
        const page = parseInt(req.query.page) || 1;
        const postsPerPage = 6;
        const startSection = (page -1) * postsPerPage;
        const endSection = startSection + postsPerPage;

        const paginatedPosts = posts.slice(startSection, endSection);
        const totalPages = Math.ceil(posts.length / postsPerPage)


    res.render('index.ejs', {
        posts: paginatedPosts,
        currentPage: page,
        totalPages: totalPages
    })
})
//Don't know if I will use this route
app.get('/about', (req, res) => {
    res.render('about.ejs')
})

app.get("/create", (req, res) => {
    res.render("create.ejs")
})
app.post("/submit", (req,res) => {
    //  console.log(req.body)
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const {title, message, author} = req.body
    posts.push({
        id,
        title,
        message,
        author
    })
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    // console.log(req.params.id)
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id)
    res.render('edit.ejs', {post})
})

        
app.post('/update/:id', (req,res) => {
    // console.log(req.params.id)
    const id = parseInt(req.params.id)
    // console.log(id)
    const {title, message, author} = req.body;
    const index = posts.findIndex(post => post.id === id)
        if(index !== -100 ){
            posts[index].title = title
            posts[index].message = message
            posts[index].author = author
        }
    res.redirect('/')
 })

 app.get('/delete/:id', (req,res) => {
    const id = parseInt(req.params.id)
    posts = posts.filter(post => 
        post.id !== id)
        res.redirect('/')
    
    
 })






app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
})