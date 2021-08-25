import React from 'react'
import { useHistory } from "react-router-dom"

function CardForm({ submitHandler, card = {}, changeFront, changeBack}) {
    const history = useHistory();

    function cardFront() {                  //if there is no card front, display nothing
      return card.front ? card.front : "";
    }
    
    function cardBack() {                   //if there is no card back, display nothing
      return card.back ? card.back : "";
    }
  
    return (
      <form id="cardForm">
        <div className="form-group">
          <label>Front</label>
          <textarea
            className="form-control"
            id="front"
            rows="3"
            value={cardFront()}
            onChange={changeFront}
            placeholder="Front side of card"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={cardBack()}
            onChange={changeBack}
            placeholder="Back side of card"
          ></textarea>
        </div>
        <button
          className="btn btn-secondary ml-2"
          type="button"
          onClick={() => history.go(-1)}
        >
          Done
        </button>
        <button
          className="btn btn-primary ml-2"
          type="submit"
          onClick={submitHandler}
        >
          Save
        </button>
      </form>
    );
  }

  export default CardForm
//since multiple components return(display) the same card form, it makes sense to make a seperate component that we can call on later.
//h1
