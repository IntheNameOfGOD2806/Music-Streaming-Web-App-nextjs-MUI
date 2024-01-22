"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
// import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import { useWavesurfer } from "@wavesurfer/react";
import { useCallback } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
const WaveTrack = () => {
  const searchParams = useSearchParams();
  const audio = searchParams.get("audio");
  console.log(audio);
  //
  const containerRef = useRef<HTMLDivElement>(null);

  const optionMemo = useMemo(() => {
    return {
      container: containerRef,
      height: 100,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `${process.env.NEXT_PUBLIC_NEXTFRONTEND_URL}api?audio=${audio}`,
    };
  }, []);
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer(optionMemo);
  //
  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);
  //
  useEffect(() => {
    if (!containerRef.current) return;
    console.log("render wave track");
    return () => {
      wavesurfer && wavesurfer.destroy();
    };
  }, []);
  return (
    <>
      <div ref={containerRef} className="wave-track"></div>{" "}
      <button onClick={onPlayPause}>sdasdada</button>
    </>
  );
};
export default WaveTrack;
