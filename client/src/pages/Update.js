import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Update = ()=>{
    const [book, setBook] = useState({
        title:"",
        desc:"",
        price:null,
        cover:"",
    })
    const nav = useNavigate();

    const location = useLocation();
    
    const id = location.pathname.split("/")[2];
    const handleCange=(e)=>
    {
        setBook((prev)=>({...prev,[e.target.name]:[e.target.value]}));
    };
    const handleClick= async e =>{
        e.preventDefault()
        try
        {
            await axios.put("http://localhost:8800/books/"+id,book);
            nav("/");
        }
        catch(shit)
        {
            console.log(location.pathname.split("/")[2]);
            console.log(shit);
        }
        console.log(book);
    }
    return <div className="form">
        <h1>Update The Book</h1>
        <input type="text" placeholder="title" onChange={handleCange} name = "title"></input>
        <input type="text" placeholder="description" onChange={handleCange} name = "desc"></input>
        <input type="text" placeholder="cover" onChange={handleCange} name = "cover"></input>
        <input type="text" placeholder="price" onChange={handleCange} name = "price"></input>
        <button onClick={handleClick}>Update</button>
    </div>
}

export default Update;