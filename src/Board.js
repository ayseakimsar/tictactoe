import { useState } from "react";
import "./board.css";

function Cell({
  currentPlayer,
  setCurrentPlayer,
  cellId,
  board,
  setBoard,
  setWinner,
  winner,
}) {
  const [cellContent, setCellContent] = useState("");

  function handleClick() {
    if (cellContent === "") {
      setCellContent(currentPlayer);
    }
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setBoard(
      board.map((c, i) => {
        if (i === cellId) {
          return currentPlayer;
        } else {
          return c;
        }
      })
    );
  }
  checkWinner(board, setWinner);
  return (
    <button disabled={winner} onClick={handleClick}>
      {cellContent}
    </button>
  );
}

function Row({ children }) {
  return <div className="row">{children}</div>;
}

export default function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState(false);
  return (
    <>
      {[...Array(3)].map((c, i) => (
        <Row key={i}>
          <Cell
            key={3 * i}
            cellId={3 * i}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            board={board}
            setBoard={setBoard}
            setWinner={setWinner}
            winner={winner}
          />
          <Cell
            key={3 * i + 1}
            cellId={3 * i + 1}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            board={board}
            setBoard={setBoard}
            setWinner={setWinner}
            winner={winner}
          />
          <Cell
            key={3 * i + 2}
            cellId={3 * i + 2}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            board={board}
            setBoard={setBoard}
            setWinner={setWinner}
            winner={winner}
          />
        </Row>
      ))}
      {winner && <p>Winner is {winner}</p>}
    </>
  );
}

function checkWinner(board, setWinner) {
  // check rows

  for (let i = 0; i < 3; i++) {
    if (
      board[3 * i] === board[3 * i + 1] &&
      board[3 * i + 1] === board[3 * i + 2] &&
      board[3 * i] !== 0
    ) {
      if (board[3 * i] === "X") {
        setWinner("Player 1");
      } else {
        setWinner("Player 2");
      }
    }
  }
  // check columns

  for (let i = 0; i < 3; i++) {
    if (
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6] &&
      board[i] !== 0
    ) {
      if (board[i] === "X") {
        setWinner("Player 1");
      } else {
        setWinner("Player 2");
      }
    }
  }

  // check diagonals

  // 0 - 4 - 8
  if (board[0] === board[4] && board[4] === board[8] && board[0] !== 0) {
    if (board[0] === "X") {
      setWinner("Player 1");
    } else {
      setWinner("Player 2");
    }
  }

  // 6 - 4 - 2

  if (board[6] === board[4] && board[4] === board[2] && board[6] !== 0) {
    if (board[6] === "X") {
      setWinner("Player 1");
    } else {
      setWinner("Player 2");
    }
  }
}
