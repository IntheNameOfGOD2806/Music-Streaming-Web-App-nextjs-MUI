// `use client`;
// import * as React from "react";
// import MediaControlCard from "@/components/media-card/music.card.control";
// import { useEffect, useState } from "react";
// import { sendRequest } from "@/utils/api";
// const TrackList = (props: any) => {
//     const[tracks,setTracks]=useState<any>();
//   async function getTracks() {
//     const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
//       url: `${
//         process.env.NEXT_PUBLIC_BACKEND_URL
//       }api/v1/tracks/users?current=${1}&pageSize=10`,
//       method: "POST",
//       body: {
//         id: props.slug,
//       },
//     });

//     return tracks;
//   }
//   useEffect(() => {
//   const tracks=  getTracks();
//   setTracks(tracks)
//   });
//   return (
//     <div className="music-tracks-container">
//       {/* @ts-ignore */}
//       {tracks &&
//         // @ts-ignore
//         tracks?.data.result.map((trackInfor) => {
//           return <MediaControlCard trackInfo={trackInfor} />;
//         })}
     
//     </div>
//   );
// };

// export default TrackList;
