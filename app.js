const express=require('express')
const app=express()
const path=require('path')
const mongoose=require('mongoose')
const authRoutes=require('./routes/authRoutes')
const dashboardRoutes=require('./routes/dashboardRoutes')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/learningPlatform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Add session middleware
app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/learningPlatform' }),
  })
);

app.set('view engine', 'ejs');
// Serve static files from 'views' folder
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))

// Routes
app.use(authRoutes);
app.use(dashboardRoutes);

// home pg
app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,'views','home.html'));
})

// login pg
app.get('/login',(req,res)=>
    {
        res.sendFile(path.join(__dirname,'views','login.html'));
    })

// signup pg
app.get('/signup',(req,res)=>
    {
        res.sendFile(path.join(__dirname,'views','signup.html'));
    })

// logout pg
app.get('/logout',(req,res)=>
    {
        res.sendFile(path.join(__dirname,'views','login.html'));
    })

// courses pg
app.get('/courses',(req,res)=>
    {
        res.sendFile(path.join(__dirname,'views','courses.html'));
    })
// start server
app.listen(3000,()=>
{
    console.log("Server is running at http://127.0.0.1:3000")
})