import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE, SETTINGS_ROUTE } from "../../constants/routes";
// @ts-ignore
import { ReactComponent as Logo } from "../../assets/logos/logo-img.svg";
import {
  alpha,
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { logout } from "../../api/authentification";
import { useUser } from "../../contexts/UserContext";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function NavigationBar({
  action,
}: {
  action?: { onClick: any; Icon: any };
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const user = useUser();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "81px" }}>
      <AppBar
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxSizing: "border-box",
          flexShrink: "0",
          position: "fixed",
          zIndex: "1100",
          top: "0px",
          left: "auto",
          right: "0px",
          padding: "8px 16px",
          transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxShadow: "none",
          backdropFilter: "blur(20px)",
          borderStyle: "solid",
          borderColor: alpha(theme.palette.primary.main, 0.08),
          borderWidth: "0px 0px thin",
          background: alpha(theme.palette.background.default, 0.7),
          color: theme.palette.secondary.main,
        }}
      >
        <Toolbar>
          {action && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={action.onClick}
            >
              <action.Icon />
            </IconButton>
          )}
          <Link
            to={DASHBOARD_ROUTE}
            style={{
              height: "36px",
              width: "36px",
            }}
          >
            <Logo height="36px" width="36px" />
          </Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Tooltip title="Déposer">
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {}}
              sx={{ ml: 2 }}
            >
              <AddOutlinedIcon width="100%" />
            </IconButton>
          </Tooltip>
          <IconButton
            size="large"
            aria-label="account of current user"
            color="inherit"
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircle width="100%" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>
          <Box display={"inline-flex"}>
            <Avatar
              alt={user.userData.displayName}
              src={user.userData.photoURL}
            >
              {user.userData.photoURL ||
                getFirstCharUpperCase(user.userData.email)}
            </Avatar>
            <Box display={"flex"} flexDirection="column" ml={1}>
              <Typography variant="body1">
                {user.userData.displayName}
              </Typography>
              <Typography variant="body2" color="lightgrey">
                {user.userData.email}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            navigate(SETTINGS_ROUTE);
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Paramètres
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Déconnexion
        </MenuItem>
      </Menu>
    </Box>
  );
}

function getFirstCharUpperCase(str: string) {
  if (str && str.length > 0) return str[0].toUpperCase();
  return undefined;
}
