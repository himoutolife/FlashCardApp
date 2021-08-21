//DONE
//path /decks/:deckId/cards/new
//use readDeck() from api/index.js
//nav bar with link to home, name of deck that is being added to and text "add card" ex:home/react router/add card
//displays react router: add card deck title
//form with front and back text fields, use <textarea>
//clicking "save" button has a new card added and connected to relevant deck, form is cleared and process repeated
//click "done" button takes to decks screen

import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom"
import {createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

 function AddCard(){
     const [deck, setDeck] =useState([])
     const [card, addCard] =useState( {front:"", back:"", deckId:""})//sets the defaults
     const {deckId} =useParams()

     useEffect(() => {

        const deckInfo = async () => {
            const response = await readDeck(deckId)
            setDeck(() => response)
        }
        deckInfo()
    }, [deckId])//stop rendering

     const handleChange=(event)=>{
        addCard({...card,[event.target.name]:event.target.value})
     }

     const handleSubmit= async (event) =>{
        event.preventDefault()
        addCard({...card, deckId:deckId})
        await createCard(deckId,card);
        addCard({front: "", back: "", deckId: ""})
    }

    return (
        <div className="col-9 mx-auto">
           
            {/*navigation bar */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">

                    {/* a link to the home page */}
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>

                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>

                    {/* a link for adding a card */}
                    <li className="breadcrumb-item">
                        Add Card
                        </li>

                </ol>
            </nav>


            <div className="row pl-3 pb-2">
                {/* a heading that display's the deck's name and "add card" */}
                <h1>{deck.name}: Add Card</h1>
            </div>
            <CardForm 
            submitForm={handleSubmit} 
            changeForm={handleChange} 
            card={card} 
            deckId={deckId} 
            />

        </div>
    )

 }
export default AddCard;