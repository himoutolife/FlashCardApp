import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";
import { listDecks } from "../utils/api/index";
//path to this should be "/"
//create a "create deck button" and link to the "create deck" screen

//show the existing decks on this screen with name, #of cards, study, view and delete buttons
//study goes to study screen THIS GOES ON DECK VIEW^
//edit goes to edit deck screen THIS GOES ON DECK VIEW^^
//delete shows a warning message before deleting. use window.confirm()for the dialog box THIS GOES ON DECK VIEW ^^^


function Home(){
    const [decks, setDecks]= useState([]);
     useEffect(()=>{
     async function getDeck(){
         const getDeckFromAPI = await listDecks();
         setDecks(getDeckFromAPI)
     }
     getDeck();
     },[]);

   
    return (
        <div>
            <div className="row mx-auto w-75">
            
             <Link to="/decks/new" className="btn btn-secondary w-25 mb-3">
                Create Deck
                </Link> 
        </div>
        <div className="row w-100 mx-auto flex-column align-items-center">
            {decks.map((deck)=>
             <DeckList
             key ={deck.id}
             deck={deck}
             /> 
            )}
        </div>
        </div>
        
    )
}


export default Home;