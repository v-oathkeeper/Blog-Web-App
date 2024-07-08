// Importing required modules
import express from 'express';
import bodyParser from 'body-parser';

// Creating an Express application
const app = express();
const port = 3000;

// Initializing an array to store posts
let posts = [];

// Post constructor function
function Post(title, content) {
    this.title = title;
    this.content = content;
    this.date = formatDateTime();
}

// Function to add a new post
function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

// Function to delete a post by index
function deletePost(index) {
    posts.splice(index, 1);
}

// Function to edit an existing post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

// Using bodyParser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files from the "public" directory
app.use(express.static("public"));

// Route to render the main page with all posts
app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

// Route to render a specific post based on its ID
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", { postId: index, title: post.title, content: post.content });
});

// Route to delete a post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// Route to render the edit page for a specific post
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", { postId: index, title: post.title, content: post.content });
});

// Route to render the create post page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Route to save a new post
app.post("/save", (req, res) => {
    let Title = req.body.title;
    let Content = req.body.content;
    addPost(Title, Content);
    res.redirect("/");
});

// Route to render the edit page for a specific post using POST method
app.post("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {
        postId: index,
        title: post.title,
        content: post.content
    });
});

// Route to update an existing post
app.post("/update", (req, res) => {
    let index = req.body.index;
    let title = req.body.title;
    let content = req.body.content;
    editPost(index, title, content);
    res.redirect("/");
});

// Route to delete a post (duplicate, removed)
app.post("/delete", (req, res) => {
    let index = req.body.postId;
    deletePost(index);
    res.redirect("/");
});

// Starting the server and adding initial posts
app.listen(port, () => {
    addPost("How to Be Great", "Great work often defies precise definition, recognized only in hindsight. It involves doing something so impactful that it expands what's possible. Instead of fixating on greatness, nurture your interests and aim for excellence. Observation fuels creativity. Like standup comedians, notice anomalies in everyday life to spark new ideas. Avoid the crank zone by substantiating unconventional beliefs with clear, evidence-based explanations. Embrace curiosity and coevolve with meaningful problems. Authenticity is crucial; engage genuinely with your audience, aiming to elevate rather than diminish your work's integrity. Learn from the masters, like Hardy's 'A Mathematician's Apology,' and balance passion with practicality. Cultivate an optimal work environment and recognize the cumulative effect of consistent effort. Generate many ideas, valuing quantity as a pathway to quality. Avoid dismissing projects as trivial 'toys' and focus on their potential. Distinguish between producing and consuming, prioritizing creative activities. Lastly, embrace originality and uncertainty as signs of potential innovation. Greatness is a journey, often uncharted. Focus on the process, and let future generations judge the outcome.");
    addPost("Python Paradox", "In a recent talk, I claimed that you can attract smarter programmers to a Python project than to a Java project. This isn't a criticism of Java programmers but a nod to the passion of Python enthusiasts. Python programmers often learn the language out of a love for programming, not job security, making them the type of talent companies should covet. This creates the Python paradox: companies using Python attract higher-caliber programmers. Google, for instance, values Python expertise. A friend who knows many languages prefers Python for its readable code. This is crucial since programmers spend more time reading code than writing it. Hence, languages like Python, created by those who care about programming, tend to attract and produce excellent programmers.")
    console.log(`Server running on Port ${port}.`);
});

// Function to format the current date and time
function formatDateTime() {
    var date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
 
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
   
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    
    let formattedDate = `${day}/${month}/${year}`;
    let formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    return `${formattedDate}, ${formattedTime}`;
}
