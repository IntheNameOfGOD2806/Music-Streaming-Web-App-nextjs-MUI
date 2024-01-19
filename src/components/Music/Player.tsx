"use client";
import { useHasMounted } from "@/utils/customHook";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Player.scss";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
 
  return (
    <AudioPlayer
      autoPlay={false}
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
      volume={0.5}
      onPlay={(e) => console.log("onPlay")}
      // other props here
    />
  );
};

export default Player;
