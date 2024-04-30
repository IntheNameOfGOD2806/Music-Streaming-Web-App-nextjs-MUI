"use client";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import TrackContext, { ITrackContext } from "@/lib/TrackContext";
import { IComment, IComments } from "@/types/backend";
import { getAvatar, sendRequest } from "@/utils/api";
import { useHasMounted } from "@/utils/customHook";
import Tooltip from "@mui/material/Tooltip";
import { useWavesurfer } from "@wavesurfer/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./WaveTrack.scss";
import { Tag } from "@mui/icons-material";
const WaveTrack = (props: {
  state: boolean;
  trackId: string;
  setCurrentTime: any;
  setTrackDuration: any;
  seekto: number;
}) => {
  const { data: session } = useSession();
  const { track, setTrack } = useContext(TrackContext) as ITrackContext;
  const searchParams = useSearchParams();
  const hasMounted = useHasMounted();
  useEffect(() => {
    getComments();
  }, [props.state]);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    // Your logic involving containerRef
  }, [containerRef.current, track]);
  const audio = searchParams.get("audio");
  var calTime = (currenttime: number): string | void => {
    if (typeof window !== "undefined") {
      const TimeString = document.getElementById("duration")!.textContent;
      const Time = hmsToSecondsOnly(TimeString!);
      const percent = (currenttime / Time) * 100;
      return `${Math.round(percent)}-${currenttime}`;
    }
  };
  useEffect(() => {
    const TimeString = document.getElementById("duration")!.textContent;
    props.setTrackDuration(hmsToSecondsOnly(TimeString!));
  });
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

  const [arrComments, setArrComments] = useState<IComment[]>();
  const getComments = async () => {
    const res = await sendRequest<IBackendRes<IComments>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/comments?current=1&pageSize=10&trackId=${track?._id}&sort=-createdAt` as string,
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
      },
    });
    // console.log(res);
    if (res && res.data) {
      setArrComments(res.data.result as IComment[]);
    }
  };
  useEffect(() => {
    getComments();
  }, [track._id, track.title, track.description, track.trackUrl]);
  //
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
      //get audio to play
      url: `${process.env.NEXT_PUBLIC_NEXTFRONTEND_URL}api?audio=${audio}`,
      /////////////////////////////////////////////
    };
  }, []);
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer(optionMemo);
  useEffect(() => {
    if (wavesurfer && props.setCurrentTime) {
      // console.log("check current time",calTime(currentTime));
      props.setCurrentTime(calTime(currentTime));
      setTrack({ ...track, progress: currentTime });
    }
  }, [currentTime]);
  useEffect(() => {
    if (wavesurfer) {
      // console.log("check seekto",props.seekto);
      wavesurfer.seekTo(props.seekto / 100);
    }
  }, [props.seekto]);
  ///
  if (track.isPlaying && track.isPlaying === true) {
    wavesurfer && wavesurfer.play();
  }
  if (track.isPlaying === false) {
    wavesurfer && wavesurfer.pause();
  }
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
  const onPlayPause = () => {
    setTrack({ ...track, isPlaying: !track.isPlaying });
  };
  useEffect(() => {
    if (!containerRef?.current) {
      console.log("no container");
      return;
    }
    //get track then update context state
    getTrackDataById(props.trackId);
    // console.log("render wave track");
    return () => {
      wavesurfer && wavesurfer.destroy();
    };
  }, []);
  useEffect(() => {
    if (wavesurfer && track.isPlaying) {
      wavesurfer.pause();
    }
  }, [track.isPlaying]);
  //
  const getTrackDataById = async (trackId: string) => {
    const res1 = await sendRequest<IBackendRes<ITrackTop>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/${props.trackId}`,
      method: "GET",
      nextOption: {
        next: { tags: ["getTrackDataById"] },
      },
    });
    if (res1 && res1.data) {
      setTrack({ ...res1.data, isPlaying: true });
    }
  };
  //tooltip
  const handleClose = (id: string) => {
    // setOpen(false);
    const comments = [...arrComments!] as IComment[];
    const index = comments.findIndex(({ _id: itemid }) => itemid === id);
    // @ts-ignore
    comments[index].isTooltipOpen = false;
    setArrComments(comments);
  };
  const handleOpen = (id: string) => {
    // setOpen(true);
    const comments = [...arrComments!];
    const index = comments.findIndex(({ _id: itemid }) => itemid === id);
    // @ts-ignore
    comments[index].isTooltipOpen = !comments[index].isTooltipOpen;
    setArrComments(comments);
  };
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
            return (
              <div
                key={`${index}-comment`}
                style={{
                  width: "18px",
                  height: "18px",
                  position: "absolute",
                  //position of image
                  left: `${item.moment}%`,
                  //
                  cursor: "pointer",
                }}
              >
                <Tooltip
                  // @ts-ignore

                  open={item.isTooltipOpen}
                  // @ts-ignore
                  onMouseEnter={() => handleOpen(item._id)}
                  onMouseLeave={() => handleClose(item._id)}
                  title={`${item.content}`}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onPointerMove={(e) => {
                      const percent = item.moment;
                      const hover = document.querySelector("#hover")!;
                      // overlay of the waveform
                      //@ts-ignore
                      hover.style.width = `${percent + 3}% `;
                      //@ts-ignore
                      hover.style.opacity = "1";
                    }}
                    key={`comment-${index}`}
                    src={`${getAvatar(item.user.type as string)}`}
                    alt=""
                  />
                </Tooltip>
              </div>
              // <Tooltip title={`${item.content}`}>
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
        onClick={onPlayPause ?? null}
        className={""}
        variant="contained"
        color="error"
      >
        {track.isPlaying ? "pause" : "play"}
      </Button>
    </>
  );
};
export default WaveTrack;
