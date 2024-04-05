import Carousel from "@/components/carousel/carousel";
import TrackCarousel from "@/components/carousel/trackCarousel";
import { getServerSession } from "next-auth/next";
import { sendRequest } from "../../utils/api";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function HomePage( context: any) {
  const session = await getServerSession(authOptions)
  console.log(session);
 
  const apiInstance=process.env.NEXT_PUBLIC_BACKEND_URL
 
 
  const res = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${apiInstance}api/v1/tracks/top`,
    method: "POST",
    body: {
      category: "CHILL",
      limit: 20,
    },
  });
  const res1 = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${apiInstance}api/v1/tracks/top`,
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: 20,
    },
  });
  const res2 = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${apiInstance}api/v1/tracks/top`,
    method: "POST",
    body: {
      category: "PARTY",
      limit: 20,
    },
  });
  // console.log(res);

  return (
    <>
      <div style={{ width: "100%", margin: "auto" }}>
        <Carousel />
        <div style={{ width: "80%", margin: "auto" }}>
          <TrackCarousel
            title={"Chill Playlist"}
            data={res?.data ? res.data : []}
          />
          <TrackCarousel
            title={"Workout Playlist"}
            data={res1?.data ? res1.data : []}
          />
            <TrackCarousel
            title={"Party Playlist"}
            data={res2?.data ? res2.data : []}
          />
          
        </div>
      </div>
    </>
  );
}
