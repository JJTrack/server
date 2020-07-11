const express = require('express');
const mysql = require('mysql2');

// create connection
const db = mysql.createConnection({
    host: 'locaLHOST',
    user: 'jono',
    password: 'raspberry',
    database: 'exampledb'
});

// connect
db.connect((err) => {

    if(err) {
        throw err;
    }

    console.log("My sql connected ...")

});


const app = express();
app.use(express.json());

// Create table
app.get('/createposttable', (req, res) => {
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Posts table created');  
    });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title: "post one", body: "this is post one"}
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post added');
        });
    });
    
// Testing post service
app.post("/makepost", (req, res) => {
        console.log(req.body.name);
        res.send("lol");
    });


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
