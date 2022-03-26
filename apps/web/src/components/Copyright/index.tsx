import { Link, Typography } from "@mui/material";
import { HOME_ROUTE } from "../../constants/routes";
import { Link as LinkRouter } from "react-router-dom";
export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{
        marginBottom: "12px",
      }}
      {...props}
    >
      {`© ${new Date().getFullYear()} `}
      <Link component={LinkRouter} to={HOME_ROUTE} color="inherit">
        {"Pixou.com"}
      </Link>
      {". Tous droits réservés."}
    </Typography>
  );
}
