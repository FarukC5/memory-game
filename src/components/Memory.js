import React, { useState, useEffect } from "react";
import "./Memory.css";
import { SingleCard } from "./SingleCard";
import cardImages from "./Images";
import AppFooter from "./AppFooter";

const Memory = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [dificulty, setDificulty] = useState(true);

  const changeToHard = () => {
    setDificulty(false);
    const playMode = [];

    for (let i = 16; i < 28; i++) {
      playMode.push(cardImages[i]);
    }

    const shuffledCards = [...playMode, ...playMode]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiseOne(null);
    setChoiseTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const shuffleCards = () => {
    setDificulty(true);
    const playMode = [];
    let normal = Math.floor(Math.random() * 5);

    for (let i = normal; i < normal + 12; i++) {
      playMode.push(cardImages[i]);
    }

    const shuffledCards = [...playMode, ...playMode]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiseOne(null);
    setChoiseTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  };

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true };
            } else return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiseOne, choiseTwo]);

  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns((PrevTurns) => PrevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const newGame = () => {
    if (dificulty === true) {
      shuffleCards();
    } else changeToHard();
  };

  return (
    <>
      <div className="main">
        <div className="buttons">
          <button onClick={newGame}>New game</button>
          <button id={dificulty === true ? `active` : ``} onClick={shuffleCards}>
            Normal
          </button>
          <button
            id={dificulty === false ? `active` : ``}
            onClick={changeToHard}
          >
            Hard
          </button>
          <button id="turns">
            Turns:<span>{turns < 10 ? "0" + turns : turns} </span>
          </button>
        </div>

        <div className="card-grid">
          {cards.map((card) => (
            <div key={card.id}>
              <SingleCard
                key={card.id}
                card={card}
                handleChoise={handleChoise}
                flipped={
                  card === choiseOne || card === choiseTwo || card.matched
                }
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default Memory;
