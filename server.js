const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testreact'
})

app.get('/', (req, res)=>{
    return res.json('from backend');
})

app.get('/user', (req, res)=>{
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/user', (req, res)=>{
    const sql = "INSERT INTO user (`email`, `username`, `password`) VALUES (?)";
    const values = [
        req.body.email,
        req.body.username,
        req.body.password
    ];

    db.query(sql, [values], (err, data)=>{
        if (err) return res.json(err);
        return res.json({message: "User added successfully", id: data.insertId})
    })
})

app.put('/user/:id', (req, res)=>{
    const sql = "UPDATE user SET email = ?, username = ?, password = ? WHERE id = ?";
    const values =[
        req.body.email,
        req.body.username,
        req.body.password
    ];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data)=>{
        if(err) return res.json(err);
        return res.json({message: "updated Sucessfully"})
    })
})

app.delete("/user/:id", (req, res) => {
  const id = req.params.id; // get user id from URL
  const sql = "DELETE FROM user WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "User deleted successfully", affectedRows: result.affectedRows });
  });
});

app.listen(8081, ()=>{
    console.log('listening')
})