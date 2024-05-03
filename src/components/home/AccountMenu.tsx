"use client";
import { getAvatar } from "@/utils/api";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function AccountMenu() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useRouter();
  const handleNavigateProfile = () => {
    navigate.push("/profile/" + session?.user?._id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log(session);
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {session && (
          <>
            <Typography sx={{ minWidth: 100, ":hover": { opacity: "0.5" } }}>
              {" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href="/playlist"
              >
                PlayList
              </Link>
            </Typography>
            <Typography sx={{ minWidth: 100, ":hover": { opacity: "0.5" } }}>
              {" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href="/liked"
              >
                Liked
              </Link>
            </Typography>
            <Typography sx={{ minWidth: 100, ":hover": { opacity: "0.5" } }}>
              {" "}
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href="/track/upload"
              >
                Upload
              </Link>
            </Typography>
          </>
        )}
        {!session && (
          <Typography sx={{ minWidth: 100, ":hover": { opacity: "0.5" } }}>
            {" "}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/api/auth/signin"
            >
              Login
            </Link>
          </Typography>
        )}
        {session && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src={`${  getAvatar(session?.user.type as string)}`}
                sx={{ width: 32, height: 32 }}
              >
                {/* <img style={{objectFit:"contain"}} src={getAvatar("GOOGLE")} alt="" /> */}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleNavigateProfile}>
          <Avatar /> Your Musics
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
