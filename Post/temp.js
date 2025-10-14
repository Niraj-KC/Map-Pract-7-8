// app.js
const express = require('express');
const app = express();

app.use(express.json());

let posts = [
    {
        id: 1,
        title: "First Post",
        content: "This is the content of the first post.",
        userId: 1
    }
];

let curr_id = posts.length + 1;

app.post("/", (req, res) => {
    const { title, content, userId } = req.body;
    const newPost = {
        id: curr_id++,
        title,
        content,
        userId,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.get("/", (req, res) => {
    res.json(posts);
});

app.put("/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("Post not found");
    post.title = req.body.title;
    post.content = req.body.content;
    res.json(post);
});

app.delete("/:id", (req, res) => {
    posts = posts.filter((p) => p.id !== parseInt(req.params.id));
    res.status(204).send();
});


app.listen(3002, () => {
    console.log("Post service running on port 3002");
});