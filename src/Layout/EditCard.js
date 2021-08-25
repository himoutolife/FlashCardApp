//DONE
//path /decks/:deckId/cards/:cardId/edit
//use readDeck() from api/index.js
//nav bar with link to home, name of deck that card is being edited, and text "edit card :cardId" ex:home/deck react router/edit card 1
//displays same form as add card, pre-filled and able to be edited and updated
//save or cancel with take to deck screen

import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import { updateCard, readDeck, readCard } from '../utils/api/index.js'
import CardForm from "./CardForm"
// allows the user to modify information on an existing card
// path: /decks/:deckId/cards/:cardId/edit

function EditCard() {
    const [deck, setDeck] = useState([])                                        // declaring variable "deck",
    const [card, setCard] = useState({front: "", back: "", deckId: ""})        // declaring variable "card"
    const {deckId, cardId} = useParams()                                        // accessing deckId and cardId from params          
    const history = useHistory()                                                // capturing useHistory is "history" variable

    useEffect(() => {                                                           //useEffect for card. After rendering, retrieves the card with a specified ID 
        const abortController = new AbortController()

        const cardInfo = async () => {                                          //capturing API response in "cardInfo"
            const response = await readCard(cardId, abortController.signal)     
            setCard(() => response)
        }
        cardInfo()
        return () => abortController.abort()
    }, [cardId])                                                               //Stop rendering after doing useEffect for specified cardId

    useEffect(() => {                                                         //useEffect for deck. After rendering, retrieves the deck with a specified ID 
        const abortController = new AbortController()

        const deckInfo = async () => {                                       //capturing API response in "deckInfo"
            const response = await readDeck(deckId, abortController.signal)
            setDeck(() => response)                                          
        }

        deckInfo()
        return () => abortController.abort()
    }, [deckId])                                                            //Stop rendering after doing useEffect for specified deckId



    const handleSubmit = async (event) => {
        event.preventDefault()
        await updateCard(card)
        history.push(`/decks/${deck.id}`)
    }

    
    function changeFront(e) {                                       //update the state as card info changes for the front
        setCard({ ...card, front: e.target.value });
    }
    function changeBack(e) {                                        //updates the state of the card info as it changes for the back
        setCard({ ...card, back: e.target.value });
    }

    return (
        <div>
           <nav aria-label="breadcrumb">            {/* navbar */}
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <Link to={'/'}>Home</Link>        {/* link to home screen*/}
                    </li>
                    <li class="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>       {/* link to home screen */}
                    </li>
                    <li class="breadcrumb-item" aria-current="page">                {/* 'Edit Card' followed by card Id using variable 'cardId' */}
                        `Edit Card ${cardId}`
                    </li>
                </ol>
            </nav>
                <h4>Edit Deck</h4>
                <CardForm
                    submitHandler={handleSubmit}
                    card={card}
                    changeFront={changeFront}
                    changeBack={changeBack}
                />
        </div>
    )
}

export default EditCard;
