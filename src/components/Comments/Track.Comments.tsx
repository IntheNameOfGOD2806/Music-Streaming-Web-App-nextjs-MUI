`use client`;
import TextField from "@mui/material/TextField";
import "./Track.Comments.scss";
import { IComment, IComments } from "@/types/backend";
import { getAvatar, sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { cache, ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import TrackContext from "@/lib/TrackContext";
import { ITrackContext } from "@/lib/TrackContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const TrackComments = (props: { currentTime: string , trackDuration: number, setState: any, setSeekto: any}) => {
  // console.log("check current time::", props.currentTime);
  dayjs.extend(relativeTime);
  const { track, setTrack } = useContext(TrackContext) as ITrackContext;
  const [comment, setComment] = useState<string>("");
  const { data: session } = useSession();
  const [arrComments, setArrComments] = useState<IComment[]>();
  const getComments = async () => {
    const res = await sendRequest<IBackendRes<IComments>>({
      url: `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }api/v1/tracks/comments?current=1&pageSize=10&trackId=${track?._id}&sort=-createdAt` as string,
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
      },
      // nextOption:{
      //   cache : "no-store"
      // }
    });
    // console.log(res);
    if (res && res.data) {
      setArrComments(res.data.result as IComment[]);
    }
  };
useEffect(() => {
  getComments();
},[track._id,track.title,track.description,track.trackUrl]);
  const postComment = async () => {
    if (!comment) {
      return;
    }
    const res = await sendRequest<any>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/comments`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
      },
      body: {
        content: comment,
        moment: Number(props.currentTime.split("-")[0]),
        track: track?._id as string,
      },
    });
    if (res && res.data) {
      setComment("");
      getComments();
      //set state of father comp
      props.setState(true);
    }
  };
  return (
    <>
      <div className="comments-wrapper">
        <div className="comment-textfield">
          <TextField
            sx={{ width: "100%" }}
            id="standard-basic"
            label="Post a comment..."
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value as string)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                postComment();
              }
            }}
          />
        </div>
        <div className="comment-section">
          <div className="comment-left">
            <div className="user-section">
              <div className="avatar-image">
                <img src="https://source.unsplash.com/random" alt="" />
              </div>
              <div style={{textAlign: "center"}} className="user-gmail">{session?.user?.email}</div>
            </div>
          </div>
          <div className="comment-right">
            <div className="track-comment-section">
              {arrComments?.map((comment): any => {
                var date = new Date(0);
                date.setSeconds(props.trackDuration*comment.moment/100);// specify value for SECONDS here
                var timeString = date.toISOString().substring(11, 19); 
                return (
                  <div className="comment-section-element">
                    <div
                      style={{ display: "flex", gap: "10px" }}
                      className="left"
                    >
                      <div className="avatar">
                        <img
                          src={getAvatar(comment?.user.type as string)}
                          alt=""
                        />
                      </div>
                      <div className="info-section">
                        <div style={{display: "flex"}} className="gmail">{comment.user.email}-
                        <span onClick={
                          ()=>{props.setSeekto(comment.moment as number)}
                          } style={{opacity: "0.5",cursor: "pointer"}}>{timeString}</span>
                         </div>
                        <div className="comment">{comment.content}</div>
                      </div>
                    </div>
                    <div className="right">
                      <p className="time">
                        {dayjs(comment.createdAt as string).fromNow()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TrackComments;
