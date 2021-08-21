//DONE

//path /decks/new
//nav bar with link to home, and text Create Deck ex: Home/create deck
//form with fields "name" and "text" for description with no text limit, use <textarea>
//submit button that returns to deck screen
//cancel button that returns to home screen

import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck(){
    const history =useHistory();
    const [newDeck, setNewDeck] = useState({name:"", description:""})


    const handleSubmit= async (event) =>{
        event.preventDefault()
        const response = await createDeck(newDeck);
        history.push(`/deck/${response.id}`);//takes back to deck list
    }

    const handleChange=(event)=>{
        setNewDeck({...newDeck,[event.target.name]:event.target.value})
    }
    return (
   
        <div className="col-9 mx-auto">
            {/*Navigation Bar */}
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        {/*link that redirects back to the home page*/}
                        <Link to="/">Home</Link>
                    </li>
                    {/*let users know that they are on the current page*/}
                    <li className="breadcrumb-item"> Create Deck
                    </li>
                </ol>
            </nav>
            {/*form for creating a new deck*/}
            <form onSubmit={handleSubmit}>
                <div>
                <label>Name:</label> <br />
                <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={newDeck.name}
                style={{ width: "100%" }}
                />
                </div>
                <br />
                <div>
                <label>Description:</label> 
                <br />
                <textarea
                id="description"
                type="textarea"
                name="description"
                rows="3"
                onChange={handleChange}
                value={newDeck.description}
                style={{ width: "100%" }}
                />
            </div>
            <Link to="/" className="btn btn-secondary mr-3">Cancel</Link>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;