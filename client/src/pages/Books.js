import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Books = ()=>{
    const [books,setBooks] = useState([]);

    useEffect(()=>{
        const fetchAll = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
                console.log(res);
            }catch(Bull_Shit){
                console.log(Bull_Shit);
            }
        };
        fetchAll();
    },[]);

    
    const handleDelete = async (id)=>{
                    try{
                        await axios.delete("http://localhost:8800/book/"+id);
                        window.location.reload();
                    }
                    catch(err)
                    {
                        console.log(err)
                    }
                }



    return(
        <div>
            <h1>The Book Store</h1>
            <div className="books">
            
                

                {books.map((_item)=>
                    <div className="book" key={_item.id}>
                            {_item.cover && <img src={_item.cover} alt=""/>}
                            <h4>{_item.title}</h4>
                            <h5>{_item.desc}</h5>
                            <h6>{_item.price}</h6>
                            <button className="delete" onClick={()=>handleDelete(_item.id)}>Delete</button>
                            <button className="update"><Link to={`/update/${_item.id}`}> Update </Link></button>
                            {<br></br>}
                    </div>
                )}

                </div>

                <button> <Link to="/add"> Add new book</Link></button>
                   
        </div>
    )



}

export default Books;