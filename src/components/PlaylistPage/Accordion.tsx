"use client";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useContext, useEffect } from "react";
import TrackContext, { ITrackContext } from "@/lib/TrackContext";
import { sendRequest } from "@/utils/api";
import PauseIcon from "@mui/icons-material/Pause";
import { useState } from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import AlertDialog from "./Confirm.Dialog";
export default function SuperAccordion({
  playlists,
}: {
  playlists: PlayListData;
}) {
  // console.log(playlists);
  const getTrackDataById = async (trackId: string) => {
    const res1 = await sendRequest<IBackendRes<ITrackTop>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/${trackId}`,
      method: "GET",
      nextOption: {
        next: { tags: ["getTrackDataById"] },
      },
    });
    if (res1 && res1.data) {
      //   setTrack({ ...res1.data, isPlaying: true });
      // res1.data.isPlaying = false;
      return res1.data;
    }
  };
  const togglePlay = async (trackId: string) => {
    const res = await getTrackDataById(trackId);
    if (trackId !== trackCurrent?._id && trackCurrent?.isPlaying === true) {
      // @ts-ignore
      setTrack({ ...res, isPlaying: true });
      return;
    }
    if (trackCurrent?.isPlaying === true) {
      // @ts-ignore
      setTrack({ ...res, isPlaying: false });
    }
    if (trackCurrent?.isPlaying === false) {
      // @ts-ignore
      setTrack({ ...res, isPlaying: true });
    }
  };
  const { track: trackCurrent, setTrack } = useContext(
    TrackContext
  ) as ITrackContext;

  const [playlistsData, setPlaylistsData] = useState<ResultItem[]>([]);
  // const {meta} = playlists
  // console.log(meta);
  useEffect(() => {
    if (playlists.result.length === 0) {
      return;
    }
    for (const playlist of playlists.result) {
      playlist.isOpenDeleteDialog = false;
    }
    setPlaylistsData(playlists.result);
  }, [playlists]);
  const handleOpenDeleteModal = (id: string) => {
    const playlistDataClone = [...playlistsData];
    const index = playlistDataClone.findIndex(
      (playlist) => playlist._id === id
    );
    playlistDataClone[index].isOpenDeleteDialog =
      playlistDataClone[index].isOpenDeleteDialog === true ? false : true;
    setPlaylistsData(playlistDataClone);
  };
  return (
    <>
      {playlistsData.length === 0 ? <>You Don't Have Any PlayList</> : null}
      {playlistsData.map((playlist) => (
        <>
          <div style={{ marginBlock: "20px" }}>
            <Accordion sx={{ marginTop: "20px" }} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
                sx={{ opacity: "0.5" }}
              >
                <QueueMusicIcon /> {playlist.title}
              </AccordionSummary>
              {playlist.tracks.length === 0 ? (
                <AccordionDetails sx={{ opacity: "0.5" }}>
                  {" "}
                  No Tracks
                </AccordionDetails>
              ) : null}
              <>
                {playlist.tracks.map((track) => (
                  <>
                    <AccordionDetails>
                      {" "}
                      <hr style={{ opacity: "0.5" }} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        key={track._id}
                      >
                        {track.title}
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => togglePlay(track._id)}
                        >
                          {trackCurrent.isPlaying &&
                          track._id === trackCurrent._id ? (
                            <PauseIcon />
                          ) : (
                            <PlayArrowIcon />
                          )}
                        </div>
                      </div>
                    </AccordionDetails>
                  </>
                ))}
              </>
              <Button
                onClick={() => handleOpenDeleteModal(playlist._id as string)}
                sx={{ float: "right", margin: "10px" }}
                variant="outlined"
                color="error"
              >
                DELETE PLAYLIST
              </Button>
            </Accordion>
          </div>
          <AlertDialog
            playlist={playlist}
            open={playlist.isOpenDeleteDialog}
            setPlaylistData={setPlaylistsData}
            PlaylistsData={playlistsData}
          />
        </>
      ))}
    </>
  );
}
