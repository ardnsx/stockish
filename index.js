import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
 
ReactDOM.render(<App />, document.getElementById('root'));

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const mysql = require("mysql");


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cloud_assignment2',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/watchlist/get', (req, res) => {
    const sqlSelect = "SELECT * FROM watchlist";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/watchlist/insert", (req, res) => {
    const ticker = req.body.searchQuery;

    const sqlInsert = "INSERT INTO watchlist (ticker) VALUES (?)";

    db.query(sqlInsert, [ticker], (err, result)=>{
        console.log(err);
    });
});

// app.delete('/watchlist/delete', (req, res)=> {
//     const name = req.params.ticker;
//     const sqlDelete = "DELETE FROM watchlist WHERE (ticker)=(?)";

//     db.query(sqlDelete, name, (err, result) => {
//         if(err) console.log(err);
//     });
// });

app.listen(3001, () => {
    console.log("running on port 3001");
});