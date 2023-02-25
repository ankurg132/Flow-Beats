import { Box } from "@chakra-ui/react"
import React from "react"
import { useEffect, useState } from "react";
import AppLayout from "../../../components/AppLayout"

const board = ["🤖", "👽", "👻", "🤡", "🐧", "🦚", "😄", "🚀"];
export default function Memorygame() {
  const [boardData, setBoardData] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // const [moves, setMoves] = useState(0);
  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (matchedCards.length == 16) {
      setGameOver(true);
    }
  }, [moves]);

  const initialize = () => {
    shuffle();
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };
  const shuffle = () => {
    const shuffledCards = [...board, ...board]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
  };

  const updateActiveCards = (i) => {
    if (!flippedCards.includes(i)) {
      if (flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] == boardData[secondIdx]) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }

        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length == 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }

      setMoves((v) => v + 1);
    }
  };

  const mintNFT = () => {
    // Mint the NFT
    console.log("NFT minted!");
  };

  return (
    <AppLayout title="NFT Collection | MintMe">
    <div className="container">
      <div className="menu">
        <p>{`Moves - ${moves}`}</p>
      </div>

      <div className="board">
        {boardData.map((data, i) => {
          const flipped = flippedCards.includes(i) ? true : false;
          const matched = matchedCards.includes(i) ? true : false;
          return (
            <div
              onClick={() => {
                updateActiveCards(i);
              }}
              key={i}
              className={`card ${flipped || matched ? "active" : ""} ${
                matched ? "matched" : ""
              } ${gameOver ? "gameover" : ""}`}
            >
              <div className="card-front">{data}</div>
              <div className="card-back"></div>
            </div>
          );
        })}
      </div>
      <div className="menu">
        <p>{`GameOver - ${gameOver}`}</p>
        <button onClick={() => initialize()} className="reset-btn">
          Reset
        </button>
        {gameOver && moves < 30 && (
    <button onClick={() => mintNFT()} className="mint-btn">
      Mint NFT
    </button>
  )}
      </div>
    </div>
    </AppLayout>
  );
}