import { Grid } from "@mui/material";
import Card from "@mui/material/Card";

export default function TicTacToe() {
  return (
    <div>
      <Card sx={{ minWidth: 400 }} variant="outlined">
        <Grid></Grid>
      </Card>
    </div>
  );
}
