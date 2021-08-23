//DONE
//path /decks/:deckId/cards/new
//use readDeck() from api/index.js
//nav bar with link to home, name of deck that is being added to and text "add card" ex:home/react router/add card
//displays react router: add card deck title
//form with front and back text fields, use <textarea>
//clicking "save" button has a new card added and connected to relevant deck, form is cleared and process repeated
//click "done" button takes to decks screen
// allows the user to add a new card to an existing deck


import React, {useEffect, useState} from 'react'
import { Link, useParams } from "react-router-dom"
import {createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";



function AddCard(){
    const [deck, setDeck] =useState([])
    const [card, setCard] =useState( {front:"", back:"", deckId:""})            //initial form state
    const {deckId} =useParams()

    useEffect(() => {                                   //load card from API to determine new card ID
       const deckInfo = async () => {
           const response = await readDeck(deckId)      //gets name from current deck
           setDeck(() => response)
       }
       deckInfo()
   }, [deckId])


    const handleSubmit= async (event) =>{
       event.preventDefault()
       setCard({...card, deckId:deckId})
       await createCard(deckId,card);
       setCard({front: "", back: "", deckId: ""})
   }


    function changeFront(e) {                               //updates the state as card info changes
        setCard({ ...card, front: e.target.value });        //update the state of the card, editing the front value 
    }
    function changeBack(e) {
        setCard({ ...card, back: e.target.value });           //update the state of the card, editing the back value 
    }


   return (
       <div className="col-9 mx-auto">
           <nav aria-label="breadcrumb">                 {/*navigation bar */}
               <ol className="breadcrumb">
                   <li className="breadcrumb-item">           {/*link to the home page */}
                       <Link to="/">
                           Home
                       </Link>
                   </li>

                   <li className="breadcrumb-item">
                       <Link to={`/decks/${deckId}`}>
                           {deck.name}
                       </Link>
                   </li>

                   <li className="breadcrumb-item">         {/* a link for adding a card */}
                       Add Card
                    </li>
               </ol>
           </nav>                           {/* a heading that display's the deck's name and "add card" */}

           <h4>{deck.name}: Add Card</h4>
            <CardForm
                submitHandler={handleSubmit}
                card={card}
                changeFront={changeFront}
                changeBack={changeBack}
            />
            </div>
   )

}
export default AddCard;
