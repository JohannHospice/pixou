import { Link, Typography } from "@mui/material";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      © {new Date().getFullYear()}{" "}
      <Link color="inherit" href={process.env["PUBLIC_URL"]}>
        Crin.com
      </Link>
      . Tous droits réservés.
    </Typography>
  );
}
