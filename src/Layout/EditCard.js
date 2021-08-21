//DONE
//path /decks/:deckId/cards/:cardId/edit
//use readDeck() from api/index.js
//nav bar with link to home, name of deck that card is being edited, and text "edit card :cardId" ex:home/deck react router/edit card 1
//displays same form as add card, pre-filled and able to be edited and updated
//save or cancel with take to deck screen

import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import { updateCard, readDeck, readCard } from '../utils/api/index.js'
import CardForm from "./CardForm.js"

function EditCard() {
    const [deck, setDeck] = useState([])
    const [card, setCard] = useState({front: "", back: "", deckId: ""})//sets the defaults
    const {deckId, cardId} = useParams()
    const history = useHistory()

    useEffect(() => {//after rendering, retrives the card with a specific card id
        const abortController = new AbortController()

        const cardInfo = async () => {
            const response = await readCard(cardId, abortController.signal)
            setCard(() => response)
        }
        cardInfo()
        return () => abortController.abort()
    }, [cardId])//after finding the card, STOP

    useEffect(() => {//after rendering, retrives the deck with a specific deck id
        const abortController = new AbortController()

        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            setDeck(() => response)
        }

        deckInfo()
        return () => abortController.abort()
    }, [deckId])//after finding the deck, STOP


    const handleChange = (event) => {//handling the data change
        setCard({...card, [event.target.name]: event.target.value})
    }
    

    const handleSubmit = async (event) => {//saving card info
        event.preventDefault()
        await updateCard(card)
        history.push(`/decks/${deck.id}`)
    }

    return (
        <div className="col-9 mx-auto">

            {/* navigation bar */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        
                        {/* link to home page */}
                        <Link to={"/"}>
                                Home
                        </Link>
                    </li>

                    {/* deck name */}
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>

                    {/* edit card */}
                    <li className="breadcrumb-item">
                        Edit Card {cardId}
                    </li>
                </ol>

            </nav>

            <div className="row pl-3 pb-2">
                <h1>Edit Card</h1>
            </div>
            <CardForm 
                submitForm={handleSubmit} 
                changeForm={handleChange} 
                card={card} 
                deckId={deckId} />
        </div>
    )
}

export default EditCard;