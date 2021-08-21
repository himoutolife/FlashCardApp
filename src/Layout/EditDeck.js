//DONE

//path /decks/:deckId/edit
//use readDeck()from api/index.js
//nav bar with link to home, name of deck being edited and text "edit deck" ex: home/rendering in react/edit deck
//same form as create deck, but is prefilled with info for existing deck
//can edit and update form
//cancel button takes to deck screen

import React, { useState,useEffect } from "react";
import {Link, useHistory,useParams} from "react-router-dom";
import {readDeck, updateDeck} from "../utils/api/index";

function EditDeck(){
    const [deck, editDeck] =useState({name:"", description:""})
    const history =useHistory()
    const {deckId} =useParams()

    useEffect(()=>{
        const abortController = new AbortController()
        const loadDeck =async () => {
            const response =await readDeck(deckId, abortController.signal)
            editDeck(() => response)
        }
        loadDeck()
        return () => abortController.abort()
    }, [deckId])
    
    const handleChange = ({event}) => {
        editDeck({...deck, [event.target.name]: event.target.value})
    }
    
    const handleSubmit =async(event) => {
        event.preventDefault()
        const response = await updateDeck(deck)
        history.push (`/decks.${response.id}`)
    }
        return (
            <div className="col-9 mx-auto">
                {/*Navigation Bar */}
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            {/*link that redirects back to the home page*/}
                            <Link to={"/"}>Home</Link>
                        </li>
                        {/*let users know that they are on the current page*/}
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item">Edit Deck</li>
                    </ol>
                </nav>
                {/*form for creating a new deck*/}
                <div className="row pl-3 pb-2">
                    <h1>Edit Deck</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                        type="name"
                        name="name"
                        value={deck.name}
                        onChange={handleChange}
                        id="name" 
                        className="form-control" 
                        placeholder={deck.name}
                        />
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea 
                        name="description"
                        value={deck.description}
                        className="form-control" 
                        id="description"
                        placeholder={deck.description} 
                        rows="4">
                        </textarea>
                    </div>
                    <Link to={`/decks/${deckId}`} name="cancel" className="btn btn-secondary mr-3">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
}





export default EditDeck;