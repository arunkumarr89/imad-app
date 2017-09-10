var express = require('express');
var morgan = require('morgan');
var path = require('path');

//Importing the PostGres Pool 
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));
//Declaring the DB Configuration
var config={
  user: 'arunkumarrit',
  database : 'arunkumarrit',
  host : 'db.imad.hasura-app.io',
  port : '5432',
  password: process.env.DB_PASSWORD
};

var articles={
'article-one':{
  title: 'Article One | Arun Profile',
  heading: 'Article One',
  date:'August 10, 2017',
  content: `<p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>
        <p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>
        <p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>`
},
'article-two':{
  title: 'Article Two | Arun Profile',
  heading: 'Article Two',
  date:'August 11, 2017',
  content: `<p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>
        <p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>
        <p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>`
},
'article-three':{
  title: 'Article Three | Arun Profile',
  heading: 'Article Three',
  date:'August 12, 2017',
  content: `<p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>
        <p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>
        <p>This is a sample article. This is a sample article. This is a sample article. This is a sample article.</p>`
}
};

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate=` <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, intial-scale=1"/>
        </head>
        <body>
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>${heading}</h3>
            <h5>${date}</h5>
            ${content}
        </body>
        </html>
    `;
    return htmlTemplate;
}

var pool = new Pool(config);

app.get('/test-db', function (req,res){
    //make a select statement
    pool.query('SELECT * FROM TEST',function(err,result){
        //return the response    
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result))
        }
    });
    
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
