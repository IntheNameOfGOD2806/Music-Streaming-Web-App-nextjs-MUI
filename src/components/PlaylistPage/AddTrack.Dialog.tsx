"use client";
import { sendRequest } from "@/utils/api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSession } from "next-auth/react";
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Chip } from "@mui/material";
interface IUpdatePlayListInfo {
  id: string;
  title: string;
  isPublic: boolean;
  tracks: string[];
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function MultipleSelectCheckmarks(props: any) {
  const {
    updatePlaylistInfo,
  }: { updatePlaylistInfo: IUpdatePlayListInfo } = props;
  const { tracksData }: { tracksData: ITrackTop[] } = props;
  const [selectedTracks, setselectedTracks] = React.useState<string[]>([]);
  const [selectedTracksName, setselectedTracksName] = React.useState<string[]>(
    []
  );
  const handleChange = (event: SelectChangeEvent<typeof selectedTracks>) => {
    const {
      target: { value },
    } = event;
    setselectedTracks(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    props.setUpdatePlaylistInfo({
      ...updatePlaylistInfo,
      // @ts-ignore
      tracks: value.map((v) => v.split("-")[0]),
    });
    // const selectedTrackNames = tracksData.map((track: ITrackTop) => {
    //   // @ts-ignore
    //   const ids = value.map((v: string) => v.split("-")[0]);
    //   if (ids.includes(`${track._id}`)) {
    //     return track.title;
    //   }
    // });
    // console.log(selectedTrackNames.filter((v) => v !== undefined));
    // setselectedTracksName(selectedTrackNames.filter((v) => v !== undefined) as string[]);
  };
  return (
    <div>
      <FormControl sx={{ marginLeft: "-1px", minWidth: 400 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Tracks</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTracks}
          onChange={handleChange}
          input={<OutlinedInput label="Select tracks" />}
          renderValue={(selected) =>
            // selected.map((v) => v.split("-")[1]).join(",")
            selected.map((v) => <Chip sx={{ maxWidth: "100px",textOverflow: "ellipsis" }} label={v.split("-")[1]} />)

          }
          MenuProps={MenuProps}
        >
          {tracksData.map((track: ITrackTop) => (
            <MenuItem
              key={`${track._id}-${track.title}`}
              value={`${track._id}-${track.title}`}
            >
              <Checkbox
                checked={
                  selectedTracks.indexOf(`${track._id}-${track.title}`) > -1
                }
              />
              <ListItemText primary={track.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
function BasicSelect(props: any) {
  const { updatePlaylistInfo } = props;
  const [playlist, setPlaylist] = React.useState<ResultItem | null>();
  const handleChange = (event: SelectChangeEvent) => {
    // @ts-ignore
    setPlaylist(event.target.value as ResultItem);
  };
  React.useEffect(() => {
    props.setUpdatePlaylistInfo({
      ...updatePlaylistInfo,
      id: playlist?._id,
      title: playlist?.title,
      isPublic: playlist?.isPublic,
    });
  }, [playlist]);
  return (
    <Box sx={{ width: 400 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ overflow: "overlay" }} id="demo-simple-select-label">
          Playlist
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={playlist?._id}
          label="Age"
          onChange={handleChange}
        >
          {props.playlistsData &&
            props.playlistsData.map((playlist: any) => (
              <MenuItem value={playlist}>{playlist.title}</MenuItem>
            ))}
          {/* {props.tracksData &&
            props.tracksData.map((track: any) => (
              <MenuItem value={track._id}>{track.title}</MenuItem>
            ))} */}
        </Select>
      </FormControl>
    </Box>
  );
}
export default function AddTrackDialog(props: any) {
  const addTracktoPlaylist = async () => {
    const res = await sendRequest<any>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/playlists`,
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
      },
      body: updatePlaylistInfo,
    });
    if (res && res.data) {
      toast.success("Add tracks success");
    }
  };
  const router = useRouter();
  const handleSubmitAddTrack = () => {
    addTracktoPlaylist();
    router.refresh();
  };
  const [updatePlaylistInfo, setUpdatePlaylistInfo] = React.useState<
    IUpdatePlayListInfo
  >({
    id: "",
    title: "",
    isPublic: true,
    tracks: [],
  });
  const { data: session } = useSession();
  const [playlistsData, setPlaylistsData] = React.useState<any>([]);
  const [tracksData, setTracksData] = React.useState<ITrackTop[]>([]);
  React.useEffect(() => {
    setPlaylistsData(props.playlists.result);
  }, [props.playlists]);
  React.useEffect(() => {
    getTracks();
  }, [session]);
  const handleClose = () => {
    props.setOpen(false);
    setUpdatePlaylistInfo({
      id: "",
      title: "",
      isPublic: true,
      tracks: [],
    });
  };
  async function getTracks() {
    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks?current=1&pageSize=100`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
      },
    });
    if (tracks) {
      setTracksData(tracks.data?.result!);
      return tracks.data?.result!;
    }
  }
  return (
    <React.Fragment>
      <Dialog
        sx={{ overflow: "overlay" }}
        open={props.open}
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
        <DialogTitle sx={{ marginBottom: "20px" }}>
          Add Track to Playlist
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              height: "200px",
              paddingTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <BasicSelect
              updatePlaylistInfo={updatePlaylistInfo}
              setUpdatePlaylistInfo={setUpdatePlaylistInfo}
              playlistsData={playlistsData}
            />
            <MultipleSelectCheckmarks
              updatePlaylistInfo={updatePlaylistInfo}
              setUpdatePlaylistInfo={setUpdatePlaylistInfo}
              tracksData={tracksData}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmitAddTrack}>
            SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
