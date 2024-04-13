import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import "./page.scss";
export const metadata: Metadata = {
  title: "Liked Page",
  description: "All tracks liked by user",
};
const likedPage = async () => {
  const session = await getServerSession(authOptions);
  const likedTracks = await sendRequest<any>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/likes?current=1&pageSize=20`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
    },
    nextOption: {
      next: { tags: ["liked"] },
    },
  });

  return (
    <>
      <Container>
        <div className="liked-section-wrapper">
          <div className="liked-section-title">
            <p>Tracks You Liked:</p>
          </div>
          <hr />
          <div className="liked-section-container">
            {likedTracks &&
              likedTracks.data?.result?.map((track: ITrackTop) => {
                return (
                  <>
                  <Link href={`/track/${track._id}?audio=${track.trackUrl}`}>
                   <div className="liked-section-item">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}images/${track.imgUrl}`}
                        alt=""
                      />
                      <div className="liked-section-item-title">
                        {track.title}
                      </div>
                    </div>
                  
                  </Link>
                   
                  </>
                  /////
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};
export default likedPage;
