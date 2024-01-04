import Button from "@mui/material/Button";

export const Square = ({
  value,
  onClick,
}: {
  value: string | null;
  onClick: (index: number) => void;
}) => {
  return (
    <Button
      component="div"
      variant="outlined"
      style={{ width: "50px", height: "50px" }}
      sx={{ borderColor: "success.main" }}
      onClick={() => onClick(Number(value))}
    >
      {value}
    </Button>
  );
};
