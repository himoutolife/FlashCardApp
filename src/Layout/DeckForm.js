import React, {useState} from "react";
import {Link } from "react-router-dom";

function DeckForm({onSubmit, initialState = { name: "", description: "" },}){

  const [deck, setDeck] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setDeck((prevState) => ({
    ...prevState,
    [name]: value,
    }));
}

function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(deck);
}
  
  return (
    <div>
        <form onSubmit={submitHandler} className="deck-edit">
            <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={deck && deck.name}
                required={true}
                placeholder="Deck Name"
                onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                id="description"
                name="description"
                className="form-control"
                rows="4"
                required={true}
                placeholder="Brief description of the deck"
                value={deck && deck.description}
                onChange={changeHandler}
                />
            </div>
            
            <Link to="/">
                <button 
                className="btn btn-secondary" type="button">Cancel</button>
            </Link>
            <button 
            className="btn btn-primary" type="submit">
                Submit
            </button>

            </fieldset>
        </form>
        </div>
    );
}

export default DeckForm;
