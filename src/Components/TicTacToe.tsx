import { useEffect, useState } from "react";
import { Board } from "./Board";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const BOARD_SIZE = 3;
const initializeBoard = (): (string | null)[] =>
  Array(BOARD_SIZE * BOARD_SIZE).fill(null);

const calculateWinner = (squares: (string | null)[]): string | null => {
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

const isBoardFull = (squares: (string | null)[]): boolean => {
  return squares.every((square) => square !== null);
};
export default function TicTacToe() {
  const [board, setBoard] = useState(initializeBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner || isBoardFull(board)) {
      setOpen(true);
    }
  }, [board]);

  const handleClose = () => {
    setOpen(false);
    setBoard(initializeBoard);
  };
  useEffect(() => {
    if (!xIsNext) {
      // AI's turn
      const bestMove = findBestMove(board);
      handleSquareClick(bestMove);
    }
  }, [xIsNext, board]);

  const handleSquareClick = (index: number) => {
    if (board[index] || calculateWinner(board) || isBoardFull(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const findBestMove = (currentBoard: (string | null)[]): number => {
    const emptySquares = currentBoard.reduce((acc, value, index) => {
      if (value === null) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    let bestScore = -Infinity;
    let bestMove = -1;

    emptySquares.forEach((index) => {
      const newBoard = [...currentBoard];
      newBoard[index] = "O"; // Assume AI is 'O', change accordingly for 'X'

      const score = minimax(newBoard, 0, false);

      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    });

    return bestMove;
  };

  const minimax = (
    board: (string | null)[],
    depth: number,
    isMaximizing: boolean
  ): number => {
    const winner = calculateWinner(board);

    if (winner !== null) {
      return winner === "O" ? 1 : -1;
    }

    if (isBoardFull(board)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board];
          newBoard[i] = "O"; // Assume AI is 'O', change accordingly for 'X'
          const score = minimax(newBoard, depth + 1, false);
          bestScore = Math.max(bestScore, score);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board];
          newBoard[i] = "X"; // Assume human player is 'X', change accordingly for 'O'
          const score = minimax(newBoard, depth + 1, true);
          bestScore = Math.min(bestScore, score);
        }
      }
      return bestScore;
    }
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull(board)
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <Card variant="outlined">
      <CardContent>
        {/*TITLE */}
        <Typography variant="button" display="block" paddingBottom={"20px"}>
          Tic Tac Toe
        </Typography>

        {/*GRID BOARD */}
        <Board squares={board} onClick={handleSquareClick}></Board>
        <Typography variant="button" display="block" paddingTop={"20px"}>
          {status}
        </Typography>
        {/*NEW GAME BUTTON */}
        <Button
          sx={{
            marginTop: "20px",
          }}
          variant="contained"
          onClick={() => setBoard(initializeBoard)}
        >
          New Game
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle></DialogTitle>
          <DialogContent
            sx={{
              margin: "10px",
            }}
          >
            {status}
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                margin: "10px",
              }}
              variant="contained"
              onClick={handleClose}
            >
              New Game
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
