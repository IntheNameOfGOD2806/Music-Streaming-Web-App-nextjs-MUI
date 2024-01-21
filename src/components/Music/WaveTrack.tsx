"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
// import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import { useWavesurfer } from "@wavesurfer/react";
import { useCallback } from "react";

const WaveTrack = () => {
  const searchParams = useSearchParams();
  const audio = searchParams.get("audio");
  console.log(audio);
  //////////////
  const containerRef = useRef(null);
 
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: `${process.env.NEXT_PUBLIC_NEXTFRONTEND_URL}api?audio=${audio}`,
  });
  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);
  useEffect(() => {
    return () => {
      wavesurfer && wavesurfer.destroy();
    };
  }, [containerRef]);

  ////////////////

  const wavetrackRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const element =  wavetrackRef.current;
  //   if (element) {
  //     const wavesurfer = WaveSurfer.create({
  //       container: element,
  //       waveColor: "rgb(200, 0, 200)",
  //       progressColor: "rgb(100, 0, 100)",
  //       url: `${process.env.NEXT_PUBLIC_NEXTFRONTEND_URL}api?audio=${audio}`,
  //     });
  //     wavesurfer.on("click", () => {
  //       wavesurfer.play();
  //     });
  //   }
  // }, []);

  return (
    <>
      <div ref={containerRef} className="wave-track"></div>{" "}
      <button onClick={onPlayPause}>sdasdada</button>
    </>
  );
};

export default WaveTrack;
