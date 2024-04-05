"use client";
import { useHasMounted } from "@/utils/customHook";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Player.scss";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS
import TrackContext, { ITrackContext } from "@/lib/TrackContext";
import { useContext, useEffect, useRef } from "react";
const Player = () => {
  const hasMounted = useHasMounted();
  const { track, setTrack } = useContext(TrackContext) as ITrackContext;
  const playerRef = useRef<any>(null);
  useEffect(() => {
    // console.log("check isplaying", track.isPlaying);
    // console.log(">>>>>playerRef.current:", playerRef.current);
    if (playerRef.current && track.isPlaying === false) {
      playerRef.current.audio.current.pause();
    }
    if (playerRef.current && track.isPlaying === true) {
      playerRef.current.audio.current.play();
    }
  }, [track.isPlaying]);
  useEffect(() => {
    if (
      playerRef.current &&
      playerRef.current.audio.current &&
      track.progress
    ) {
      playerRef.current.audio.current.currentTime = track.progress;
    }
  }, [track.progress]);
  if (!hasMounted) return <></>;

  //
  //  console.log(">>>check track::",track);
  return (
    <AudioPlayer
      // layout="horizontal-reverse"

      autoPlay={false}
      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/${track?.trackUrl}`}
      volume={0.5}
      onPlay={(e) => setTrack({ ...track, isPlaying: true })}
      onPause={(e) => setTrack({ ...track, isPlaying: false })}
      ref={playerRef}
    />
  );
};

export default Player;
