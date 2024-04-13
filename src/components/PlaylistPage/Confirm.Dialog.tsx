"use client";
import { sendRequest } from "@/utils/api";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const deletePlaylist = async (id: string) => {
    const res1 = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/playlists/${id}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
      },
    });
    if (res1 && res1.data) {
      return res1.data;
    }
  };
  const handleClose = async (action: string) => {
    const { _id }: { _id: string } = props.playlist;
    // alert(_id)
    // console.log(props.playlistsData);
    const index = props?.PlaylistsData?.findIndex(
      (playlist: any) => playlist._id === _id
    );
    // console.log(index)

    const newPlaylistsData = [...props.PlaylistsData];
    newPlaylistsData[index].isOpenDeleteDialog = false;
    props.setPlaylistData(newPlaylistsData);

    if (action === "CONFIRM") {
      const res = await deletePlaylist(_id);
      if (res) {
        toast.success("Delete playlist successfully");
        router.refresh();
      }
    }
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center", color: "red" }}>
          {"Delete this playlist?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this playlist?
            <div style={{ color: "blue" }}>
              Playlist Name:{" "}
              <span style={{ color: "gray" }}>{props.playlist.title}</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("CANCEL")} sx={{ color: "red" }}>
            Cancel
          </Button>
          <Button onClick={() => handleClose("CONFIRM")}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
