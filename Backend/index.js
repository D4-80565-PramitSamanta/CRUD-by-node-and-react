const e = require('express');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const dbCon = mysql.createConnection(
    {
        host:"localhost",
        user:"pramit",
        password:"1234",
        database:"sys"
    }
)

app.use(express.json());

app.use(cors());

app.get("/", (req,res)=>{
    res.json("hello this is the backend ///");
})

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books";
    dbCon.query(q,(err,data)=>
    {
        if(err) return res.json(err);
        else return res.json(data);
    })
})


app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
    const values = 
    [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,

    ];
    dbCon.query(q,[values],(error,data)=>{
        if(error)return res.json(error);
        else return res.json(data);
    })
})


app.put("/books/:id",(req,res)=>{
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE (`id` = ?)";
    const values = 
    [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    dbCon.query(q,[...values,req.params.id],(error,data)=>{
        if(error)return res.json(error);
        else return res.json(data);
    })
})

app.delete("/book/:id",(req,res)=>
{
    const id = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    dbCon.query(q,[id],(err,data)=>{
        if(err)console.log(err);
        else return res.json("Book has been deleted succesfully");
    })
})

app.listen(8800,()=>{
    console.log("connected to backend !!! ")
})