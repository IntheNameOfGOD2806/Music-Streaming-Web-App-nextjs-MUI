"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));
const label = { inputProps: { "aria-label": "Color switch demo" } };
export default function CreatePlaylistDialog(props: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isPublic, setIsPublic] = React.useState<boolean>(false);
  const [playlistTitle, setPlaylistTitle] = React.useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();
  const addPlaylist = async (title: string, isPublic: boolean) => {
    const res = await sendRequest<any>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/playlists/empty`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
      },
      body: {
        title,
        isPublic,
      },
    });
    if (res && res.data) {
      return res;
    }
  };
  const handleAddPlaylist = async () => {
    const res = await addPlaylist(playlistTitle, isPublic);
    if (res) {
      toast.success(res?.message);
    //   await sendRequest<any>({
    //     url: `${process.env.NEXT_PUBLIC_NEXTFRONTEND_URL}api/revalidate?tag=playlists&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`,
    //     method: "POST",
    //   });
      router.refresh();
    }
  };

  React.useEffect(() => {
    if (props.open) {
      setOpen(props.open);
    }
  }, [props.open]);
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
    props.setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create a New Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form to create a new playlist:
          </DialogContentText>
          <TextField
            autoFocus={false}
            required
            margin="dense"
            id="name"
            name="email"
            label="Playlist Title"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            value={playlistTitle}
            onChange={(e) => setPlaylistTitle(e.target.value)}
          />
        </DialogContent>
        <div style={{ marginLeft: "15px" }}>
          <PinkSwitch
            onClick={() => setIsPublic(!isPublic)}
            {...label}
            defaultChecked
          />
          {isPublic && (
            <span
              style={{ marginLeft: "10px", fontWeight: "bold", opacity: "0.5" }}
            >
              Private
            </span>
          )}
          {!isPublic && (
            <span
              style={{ marginLeft: "10px", fontWeight: "bold", opacity: "0.5" }}
            >
              Public
            </span>
          )}
        </div>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button onClick={handleAddPlaylist} type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
