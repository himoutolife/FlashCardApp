//DONE

//path /decks/:deckId/edit
//use readDeck()from api/index.js
//nav bar with link to home, name of deck being edited and text "edit deck" ex: home/rendering in react/edit deck
//same form as create deck, but is prefilled with info for existing deck
//can edit and update form
//cancel button takes to deck screen

import React, { useState,useEffect }  from 'react'
import {Link, useHistory,useParams} from "react-router-dom";
import {readDeck, updateDeck} from "../utils/api/index";
import DeckForm  from "./DeckForm"
// allows the user to modify information on an existing deck
// path: /decks/:deckId/edit

function EditDeck(){
    const [deck, setDeck] =useState({id: 0, name:"", description:""})
    const history =useHistory()
    const {deckId} =useParams()

    useEffect(()=>{                                 //fetch card data with useEffect
        const abortController = new AbortController()
        const loadDeck =async () => {
            const response =await readDeck(deckId, abortController.signal)
            setDeck(() => response)
        }
        loadDeck()
        return () => abortController.abort()
    }, [deckId])
    
    // const handleChange = ({event}) => {
    //     editDeck({...deck, [event.target.name]: event.target.value})
    // }
    
    const handleSubmit =async(event) => {
        event.preventDefault()
        const response = await updateDeck(deck)
        history.push (`/decks.${response.id}`)
    }

    function changeName(e) {                             //change deck state when name changes
        setDeck({ ...deck, name: e.target.value });
    }
    
    function changeDesc(e) {                            //change deck state when description changes
        setDeck({ ...deck, description: e.target.value });
    }


        return (
            <div className="col-9 mx-auto">
                <nav>                                {/*Navigation Bar */}
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}>Home</Link>       {/*link that redirects back to the home page*/}
                        </li>
                        <li className="breadcrumb-item">Edit Deck            {/*let users know that they are the "edit deck" page*/}
                        </li>         
                    </ol>
                </nav>
                <h4>Edit Deck</h4>
                    <DeckForm
                        submitFunction={handleSubmit}
                        deck={deck}
                        changeName={changeName}
                        changeDesc={changeDesc}
                    />
            </div>
        )
}

export default EditDeck;
