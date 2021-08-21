//linked at /decks/:deckId/study
//use readDeck() func from the api/index.js file
//nav bar with links to hom, name of deck studying, and text saying study ex:home/rendering in react/study
//deck title is showing
//cards are shown one at a time, front side first, with button on bottom to flip it
//add a next button after flipping
//after last card, a "restart prompt" message shows to restart the deck or return to home. this should be a dialog box with window.confirm()
//decks with 2 or less cards should show error message of "not enough cards" and a button to add cards that takes to the add card screen

import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readDeck } from '../utils/api/index.js'
import CardList from './CardList'


function Study() {
    const [deck, setDeck] = useState({})
    const {deckId} = useParams()
    
    useEffect(() => { 
        const findDeck = async () => { 
            const currDeck = await readDeck(deckId)
            setDeck(()=> currDeck)    
        }
        findDeck()
    }, [deckId])
    

    if (Object.keys(deck).length) {
        return (
            <div className="col-9 mx-auto">

                {/* navigation bar */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">

                        <li className="breadcrumb-item">
                            <Link to={"/"}> Home
                            </Link>
                        </li>
                        
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>

                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>
                </nav>
            
                <div>
                    <h1>{deck.name}: Study</h1>
                </div>
                <CardList cards={deck.cards}/>
            </div>
        )

    } else {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">
                   Loading...
                </span>
            </div>
        ) 
    }
}

export default Study;