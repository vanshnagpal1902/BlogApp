const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: __dirname + "/upload" });

app.use(express.static(__dirname + "/upload"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: "abcde",
    resave: true,
    saveUninitialized: false
}));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB database");
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    filepaths: [String]
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const login = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
};

const isadmin = (req, res, next) => {
    if (req.session.user.role === "admin") {
        next();
    } else {
        res.redirect("/");
    }
};

const isauthor = (req, res, next) => {
    if (req.session.user.role === "author") {
        next();
    } else {
        res.redirect("/");
    }
};

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
        req.session.user = user;
        if (user.role === "admin") {
            res.redirect("/admin");
        } else if (user.role === "author") {
            res.redirect("/author");
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/signup");
    }
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        res.redirect("/signup");
    } else {
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.get("/admin", login, isadmin, async (req, res) => {
    const posts = await Post.find();
    res.render("admin", { username: req.session.user.username, posts: posts });
});

app.get("/author", login, isauthor, async (req, res) => {
    const posts = await Post.find();
    res.render("author", { username: req.session.user.username, posts: posts });
});

app.get("/deletepost/:title", async (req, res) => {
    const title = req.params.title;
    await Post.deleteOne({ title });
    if (req.session.user.role === "admin") {
        res.redirect("/admin");
    } else if (req.session.user.role === "author") {
        res.redirect("/author");
    } else {
        res.redirect("/");
    }
});

app.get("/addpost", login, (req, res) => {
    if (req.session.user.role === "admin") {
        res.render("addpost");
    } else if (req.session.user.role === "author") {
        res.render("addpost");
    } else {
        res.redirect("/");
    }
});

app.post("/addpost", upload.array("pic", 5), login, async (req, res) => {
    let { title, content } = req.body;
    let files = req.files;
    let filepaths = [];
    if (files && files.length > 0) {
        files.forEach(e => {
            filepaths.push(e.filename);
        });
    }
    const username = req.session.user.username;
    const newpost = new Post({ title, content, author: username, filepaths });
    await newpost.save();
    if (req.session.user.role === "admin") {
        res.redirect("/admin");
    } else if (req.session.user.role === "author") {
        res.redirect("/author");
    } else {
        res.redirect("/");
    }
});

app.get("/updatepost/:title", login, async (req, res) => {
    const title = req.params.title;
    const posts = await Post.find({ title });
    res.render("update", { posts });
});

app.post("/updatepost", login, async (req, res) => {
    const { post, content, old } = req.body;
    await Post.updateOne({ title: old }, { title: post, content });
    if (req.session.user.role === "admin") {
        res.redirect("/admin");
    } else if (req.session.user.role === "author") {
        res.redirect("/author");
    } else {
        res.redirect("/");
    }
});

app.get("/deleteauthor", login, isadmin, async (req, res) => {
    const authors = await User.find({ role: "author" });
    res.render("deleteauthor", { authors });
});

app.post("/deleteauthor", login, isadmin, async (req, res) => {
    const { authorToDelete } = req.body;
    await User.deleteOne({ username: authorToDelete });
    res.redirect("/admin");
});

app.get("/authordashboard", login, isadmin, async (req, res) => {
    const authors = await User.find({ role: "author" });
    res.render("authordashboard", { authors, session: req.session });
});

app.get("/profile", login, async (req, res) => {
    const username = req.session.user.username;
    const userPosts = await Post.find({ author: username });
    res.render("profile", { username, posts: userPosts, session: req.session, post: userPosts[0] });
});

app.get("/fullpost/:title", async (req, res) => {
    const title = req.params.title;
    const post = await Post.findOne({ title });

    if (post) {
        res.render("fullpost", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server started");
    }
});
