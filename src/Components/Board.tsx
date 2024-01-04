import Grid from "@mui/material/Grid";
import { Square } from "./Square";

interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
}
export const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  return (
    <Grid container spacing={2}>
      {[0, 1, 2].map((row) => (
        <Grid container item key={row} spacing={2} justifyContent="center">
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
};
