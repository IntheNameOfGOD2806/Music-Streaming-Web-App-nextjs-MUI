"use client";
import TrackContext, { ITrackContext } from "@/lib/TrackContext";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useContext } from "react";
export default function MediaControlCard(props: any) {
  const { track, setTrack } = useContext(TrackContext) as ITrackContext;

  const { trackInfo } = props;

  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Link
            style={{ textDecoration: "none", color: "black", fontSize: "18px" }}
            href={`${process.env.NEXT_PUBLIC_NEXTFRONTEND_URL}/track/${trackInfo._id}?audio=${trackInfo.trackUrl}`}
          >
            <Typography component="div" variant="h5">
              {trackInfo?.title}
            </Typography>
          </Link>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {trackInfo?.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          {/* @ts-ignore */}
          <IconButton aria-label="play/pause">
            {track.isPlaying && trackInfo._id === track._id ? (
              <PauseIcon
                sx={{ height: 38, width: 38 }}
                onClick={() => setTrack({ ...trackInfo, isPlaying: false })}
              />
            ) : (
              <PlayArrowIcon
                sx={{ height: 38, width: 38 }}
                onClick={() => setTrack({ ...trackInfo, isPlaying: true })}
              />
            )}
            {/* <PlayArrowIcon sx={{ height: 38, width: 38 }} /> */}
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, float: "right" }}
        image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${trackInfo?.imgUrl}`}
        alt="image-cover"
      />
    </Card>
  );
}
