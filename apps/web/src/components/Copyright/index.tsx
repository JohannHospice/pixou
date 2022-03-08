import { Link, Typography } from "@mui/material";

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
      © {new Date().getFullYear()}{" "}
      <Link color="inherit" href={process.env["PUBLIC_URL"]}>
        Pixou.com
      </Link>
      . Tous droits réservés.
    </Typography>
  );
}
