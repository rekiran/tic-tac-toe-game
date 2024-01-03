import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Square = ({
  value,
  onClick,
}: {
  value: string | null;
  onClick: (index: number) => void;
}) => (
  <Button
    component="div"
    variant="outlined"
    style={{ width: "50px", height: "50px" }}
    onClick={() => onClick(Number(value))}
  >
    {value}
  </Button>
);
interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
}
const Board: React.FC<BoardProps> = ({ squares, onClick }) => (
  <Grid container spacing={1}>
    {[0, 1, 2].map((row) => (
      <Grid container item key={row} justifyContent="center">
        {[0, 1, 2].map((col) => (
          <Grid item key={col}>
            <Square
              value={squares[row * 3 + col]}
              onClick={() => onClick(row * 3 + col)}
            />
          </Grid>
        ))}
      </Grid>
    ))}
  </Grid>
);

const TicTacToe = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const xIsNext = stepNumber % 2 === 0;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = current.squares.slice();

    if (winner || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? "X" : "O";

    setHistory([...newHistory, { squares: currentSquares }]);
    setStepNumber(newHistory.length);
  };

  const restartGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Tic Tac Toe
      </Typography>
      <Board squares={current.squares} onClick={handleClick} />
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        {status}
      </Typography>
      <Button
        variant="contained"
        onClick={restartGame}
        style={{ marginTop: "10px" }}
      >
        Restart Game
      </Button>
    </div>
  );
};

export default TicTacToe;
