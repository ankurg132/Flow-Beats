import { Box } from "@chakra-ui/react"
import React from "react"
import { useEffect, useState } from "react"
import AppLayout from "../../../components/AppLayout"
import Link from "next/link"

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
const Tic = () => {
  const [xTurn, setXTurn] = useState(true)
  const [won, setWon] = useState(false)
  const [wonCombo, setWonCombo] = useState([])
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  })
  const [isDraw, setIsDraw] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  useEffect(() => {
    checkWinner()
    checkDraw()
  }, [boardData])
  const updateBoardData = (idx) => {
    if (!boardData[idx] && !won) {
      //will check whether specify idx is empty or not
      let value = xTurn === true ? "X" : "O"
      setBoardData({ ...boardData, [idx]: value })
      setXTurn(!xTurn)
    }
  }
  const checkDraw = () => {
    let check = Object.keys(boardData).every((v) => boardData[v])
    setIsDraw(check)
    if (check) setModalTitle("Match Draw!!!")
  }
  const checkWinner = () => {
    WINNING_COMBO.map((bd) => {
      const [a, b, c] = bd
      if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
        setWon(true)
        setWonCombo([a, b, c])
        setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!!!`)

        return
      }
    })
  }

  const reset = () => {
    setBoardData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    })
    setXTurn(true)
    setWon(false)
    setWonCombo([])
    setIsDraw(false)
    setModalTitle("")
  }
  return (
    <AppLayout title="NFT Collection | MintMe">
      <div className="tictactoe">
        <div className="game">
          <div className="game__menu">
            <p>{xTurn === true ? "X Turn" : "O Turn"}</p>
            {/* <p>{`Game Won:${won} Draw: ${isDraw}`}</p> */}
          </div>
          <div className="game__board">
            {[...Array(9)].map((v, idx) => {
              return (
                <div
                  onClick={() => {
                    updateBoardData(idx)
                  }}
                  key={idx}
                  className={`square ${wonCombo.includes(idx) ? "highlight" : ""}`}
                >
                  {boardData[idx]}
                </div>
              )
            })}
          </div>
        </div>

        <div className={`modal ${modalTitle ? "show" : ""}`}>
          <div className="tictoe-btn">
            <button onClick={reset}>New Game</button>
            {won ==true && (
              <Link href="/app/new-item">
                <button className="mint-btn">Mint NFT</button>
              </Link>
            )}
          </div>
          <div className="modal__title">{modalTitle}</div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Tic
