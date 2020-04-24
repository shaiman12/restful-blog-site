//App config
var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose");

mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
                type: Date, 
                default: Date.now
            }
});

var Blog = mongoose.model("Blog", blogSchema);


// RESTFUL ROUTES
app.get("/",function(req,res){
    res.redirect("/blogs");
});


app.get("/blogs",function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error");
        }else{
            res.render("index",{blogs: blogs});
        }
    });

});



app.listen(3000, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
});