"use client";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import { useWavesurfer } from "@wavesurfer/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./WaveTrack.scss";
const WaveTrack = () => {
  var calTime = (currenttime: number) => {
    if (typeof window === "undefined") {
      const TimeString = document.getElementById("duration")!.textContent;
      const Time = hmsToSecondsOnly(TimeString!);
      const percent = (currenttime / Time) * 100;
      return percent;
    }
  };
  function hmsToSecondsOnly(str: string): number {
    var p = str!.split(":"),
      s = 0,
      m = 1;
    while (p.length > 0) {
      s += m * parseInt(p.pop()!, 10);
      m *= 60;
    }
    return s;
  }
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };
 
  //comments :
  const arrComments = [
    {
      id: 1,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 10,
      user: "username 1",
      content: "just a comment1",
    },
    {
      id: 2,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 30,
      user: "username 2",
      content: "just a comment3",
    },
    {
      id: 3,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 50,
      user: "username 3",
      content: "just a comment3",
    },
  ];
  const searchParams = useSearchParams();
  const audio = searchParams.get("audio");
  const containerRef = useRef<HTMLDivElement>(null);

   ///clolor :
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d")!;
   const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
   gradient.addColorStop(0, "#656666"); // Top color
   gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
   gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
   gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
   gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
   gradient.addColorStop(1, "#B1B1B1"); // Bottom color
   // Define the progress gradient
   const progressGradient = ctx.createLinearGradient(
     0,
     0,
     0,
     canvas.height * 1.35
   );
   progressGradient.addColorStop(0, "#EE772F"); // Top color
   progressGradient.addColorStop(
     (canvas.height * 0.7) / canvas.height,
     "#EB4926"
   ); // Top color
   progressGradient.addColorStop(
     (canvas.height * 0.7 + 1) / canvas.height,
     "#ffffff"
   ); // White line
   progressGradient.addColorStop(
     (canvas.height * 0.7 + 2) / canvas.height,
     "#ffffff"
   ); // White line
   progressGradient.addColorStop(
     (canvas.height * 0.7 + 3) / canvas.height,
     "#F6B094"
   ); // Bottom color
   progressGradient.addColorStop(1, "#F6B094"); // Bottom color
 
  
   const optionMemo = useMemo((): Omit<WaveSurferOptions, "container"> & {
     container: React.RefObject<HTMLElement>;
   } => {
     return {
       waveColor: gradient,
       progressColor: progressGradient,
       barWidth: 3,
       container: containerRef,
       height: 200,
       barHeight: 0.6,
       // waveColor: "rgb(200, 0, 200)",
       // progressColor: "rgb(100, 0, 100)",
       url: `${process.env.NEXT_PUBLIC_NEXTFRONTEND_URL}api?audio=${audio}`,
     };
   }, []);
   const { wavesurfer, isPlaying, currentTime } = useWavesurfer(optionMemo);
   // console.log(currentTime);
   //hover effect
   const hover = document.querySelector("#hover");
   const waveform = document.querySelector("#waveform");
   waveform!?.addEventListener(
     "pointermove",
     //@ts-ignore
     (e) => (hover!.style.width = `${e.offsetX}px`)
   );
 
   const timeEl = document.querySelector("#time");
   const durationEl = document.querySelector("#duration");
   wavesurfer?.on(
     "decode",
     (duration) => (durationEl!.textContent = formatTime(duration))
   );
   wavesurfer?.on(
     "timeupdate",
     (currentTime) => (timeEl!.textContent = formatTime(currentTime))
   );
   const onPlayPause = useCallback(() => {
     wavesurfer && wavesurfer.playPause();
   }, [wavesurfer]);
  useEffect(() => {
    if (!containerRef?.current){
      console.log("no container");  
      return;
    };
   
    console.log("render wave track");
    return () => {
      wavesurfer && wavesurfer.destroy();
    };
  }, []);
  //
 
  return (
    <>
      <div ref={containerRef} id="waveform" className="wave-track">
        <div id="time" style={{ marginTop: "4px" }}>
          0:00
        </div>
        <div id="duration" style={{ marginTop: "4px", marginLeft: "10px" }}>
          0:00
        </div>
        <div id="hover"></div>
      </div>
      <div className="comments" style={{ display: "flex" }}>
        {arrComments &&
          arrComments.map((item, index) => {
            const position = calTime(currentTime);
            return (
              // <Tooltip title={`${item.content}`}>
              <img
                onPointerMove={(e) => {
                  const percent = item.moment;
                  const hover = document.querySelector("#hover")!;
                  //@ts-ignore
                  hover.style.width = `${percent + 3}% `;
                  //@ts-ignore
                  hover.style.opacity = "1";
                }}
                key={`comment-${index}`}
                style={{
                  width: "30px",
                  height: "30px",
                  position: "absolute",
                  left: `${item.moment}%`,
                  cursor: "pointer",
                }}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}images/chill1.png`}
                alt=""
              />
              // </Tooltip>
            );
          })}
      </div>
      <Button
        sx={{
          width: "60px",
          height: "60px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-280px,-240px)",
          borderRadius: "50%",
          backgroundColor: "#ED474A",
        }}
        onClick={onPlayPause??null}
        className={""}
        variant="contained"
        color="error"
      >
        {isPlaying ? "pause" : "play"}
      </Button>
    </>
  );
};
export default WaveTrack;
