`use client`;

import TrackContext, { ITrackContext } from "@/lib/TrackContext";
import { useContext, useEffect, useRef } from "react";
import { useHasMounted } from "@/utils/customHook";
export default function PlayerAuthor() {

    const { track, setTrack } = useContext(TrackContext) as ITrackContext;
    // console.log("check track::", track);
  return (
    <div className="music-player-author">
      <h3 style={{ margin: "-10px 0px" }}> {track?.title}</h3>
      <p>{track?.description}</p>
    </div>
  );
}
