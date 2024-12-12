import React, { useState } from "react";
import "./App.css";

function App () {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null))); // A 2D array to represent the board
  const [player, setPlayer] = useState("X"); // Set initial player to X
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState(""); // Error message for invalid moves

  const handleClick = (row, col) => {
    // If there is a winner or the cell is already filled, return
    if (winner || board[row][col]) {
      setError("Invalid move!");
      return;
    }
    setError("");
    // Update the board with the current player's move
    const newBoard = board.map((r, i) =>
      r.map((current, j) => (i === row && j === col ? player : current))
    );

    setBoard(newBoard);

    // Check if there is a winner or a tie
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result === "tie" ? "It's a tie! No one wins :(" : `Congratulations! Player ${result} wins!`) // Output results of the game
    } else {
      setPlayer(player === "X" ? "O" : "X") // Switch the player and game continues
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(3).fill(Array(3).fill(null)));
    setPlayer("X");
    setWinner(null);
    setError("");
  };
  // Check if there is a winner
  const checkWinner = (board) => {
    const lines = [
      // Winning row combinations
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // Winning column combinations
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Winning diagonal combinations
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];
    for (let line of lines) {
      if (line.every(cell => cell === "X")) return "X";
      if (line.every(cell => cell === "O")) return "O";
    }
    return board.flat().every(cell => cell) ? "tie" : null;
  };

  return (
    <div id="main">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">
        {winner ? winner : `Player ${player}'s turn`}
      </div>
      <div className="board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className="cell"
              onClick={() => handleClick(i, j)}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      {error && <div className="error">{error}</div>}
      <button id="reset" onClick={resetGame}>Reset</button>
    </div>
  )
}

export default App
