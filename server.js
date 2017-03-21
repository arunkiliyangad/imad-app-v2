var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config={
    user: 'arunkiliyangad',
    database: 'arunkiliyangad',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.db-arunkiliyangad-87588
};
var app = express();
app.use(morgan('combined'));
var articles= {
'article-one': {
    title: 'Article one|Arunkumar',
    heading: 'Article one',
    date: 'Feb 15,2017',
    content: `
             <p>
                This is the content of my first article. Thi This is the content of my first article.  This is the content of my first article. This is the content of my first article.  This is the content of my first article. This is the content of my first article. This is the content of my first article. s is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. 
            </p>
            <p>
                This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. 
            </p>
            <p>
                This is the content of my first article.This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. v v This is the content of my first article. This is the content of my first article.
            </p>`
   
},
'article-two': {
    title: 'Article two|Arunkumar',
    heading: 'Article Two',
    date: 'Feb 19,2017',
    content: `
             <p>
                This is the content of my second article. 
            </p>`},
'article-three': {title: 'Article three|Arunkumar',
    heading: 'Article Three',
    date: 'Feb 20,2017',
    content: `
             <p>
                This is the content of my third article. 
            </p>`},

};
function createTemplate (data)   {  
    var title= data.title;
    var heading= data.heading;
    var date= data.date;
    var content= data.content;
    
var htmlTemplate=`
                <html>
                    <head>
                        <title>
                          ${title}
                        </title>
                         <meta name="viewport" content="width=device-width, initial scale=1"/>
                         <link href="/ui/style.css" rel="stylesheet" />  
                    </head> 
                    <body>
                    <div class="container">
                    <div>
                         <a href="/">home</a>
                        </div>
                        <hr/>
                        <h3>
                          ${heading}  
                        </h3>
                        <div>
                          ${date}  
                        </div>
                        <div>
                          ${content}  
                        </div>
                        </div>
                    </body>
                    
                </html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res) {
    //make a select request
    //return a responce with result
    pool.query('SELECT * FROM "test"', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    });
});
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});
app.get('/:articleName', function (req, res) {
    //articleName == article-one
    //articles[articelName] == {} content object of article one
    var articleName= req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});
app.get('/article-two', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];
app.get('/submit-name/:name', function (req, res) {
    //Get the name from request
    var name=req.params.name; 
    names.push(name);
    //JSON: Javascript Object Notation
    res.send(JSON.stringify(names)); 
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
