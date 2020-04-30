
const express = require('express');
const app = express();

const session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:'icecream'

}));


app.use(function(req, res, next) {
    if(process.env.ENVIRONMENT === 'DEVELOPMENT')
    {
        res.header("Access-Control-Allow-Origin",
            "http://localhost:3000");
    }
    else {
          res.header("Access-Control-Allow-Origin",
             " https://dbms-cs5200-final-front-end.herokuapp.com");
    }


    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const userService = require('./services/user.service.server');
const postService =  require('./services/post.service.server')
const recipeService = require('./services/recipe.service.server');
const tagService = require('./services/tags.service.server')
const connectService = require('./services/connect.service.server')
userService(app);
recipeService(app);
postService(app);
tagService(app);
connectService(app);

const server = app.listen(process.env.PORT || 3000, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});