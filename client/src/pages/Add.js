import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Add = ()=>{
    const [book, setBook] = useState({
        title:"",
        desc:"",
        price:null,
        cover:"",
    })

    const nav = useNavigate();

    const handleCange=(e)=>
    {
        setBook((prev)=>({...prev,[e.target.name]:[e.target.value]}));
    };

    const handleClick= async e =>{
        e.preventDefault()

        try
        {
            await axios.post("http://localhost:8800/books",book);
            nav("/");
        }
        catch(shit)
        {
            console.log(shit);
        }
        console.log(book);

        
    }

    return <div className="form">
        <h1>Add New Book</h1>
        <input type="text" placeholder="title" onChange={handleCange} name = "title"></input>
        <input type="text" placeholder="description" onChange={handleCange} name = "desc"></input>
        <input type="text" placeholder="cover" onChange={handleCange} name = "cover"></input>
        <input type="text" placeholder="price" onChange={handleCange} name = "price"></input>

        <button onClick={handleClick}>Add</button>
    </div>
}

export default Add;