import Carousel from "@/components/carousel/carousel";
import TrackCarousel from "@/components/carousel/trackCarousel";
import { sendRequest } from "../utils/api";
export default async function HomePage() {

 
  const apiInstance=process.env.NEXT_PUBLIC_BACKEND_URL
  // const api = wretch("http://localhost:8000/", { mode: "cors" })
  //   .errorType("json")
  //   .resolve((r) => r.json());
  // //
  // const res = await api.url("api/v1/tracks/top").post({
  //   category: "CHILL",
  //   limit: 10,
  // });
  // console.log(res);
  // //////////////////////////////
  // const res1 = await sendRequestJS({
  //   url: "http://localhost:8000/api/v1/tracks/top",
  //   method: "POST",
  //   body: {
  //     category: "CHILL",
  //     limit: 10,
  //   },
  // });
  // console.log(res1);

  // ///////////////////////////////////
  // interface IUser {
  //   category: string;
  //   limit: number;
  // }
  const res = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${apiInstance}api/v1/tracks/top`,
    method: "POST",
    body: {
      category: "CHILL",
      limit: 10,
    },
  });
  const res1 = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${apiInstance}api/v1/tracks/top`,
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: 10,
    },
  });
  console.log(res);

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
            title={"Workout Playlist"}
            data={res1?.data ? res1.data : []}
          />
            <TrackCarousel
            title={"Workout Playlist"}
            data={res1?.data ? res1.data : []}
          />
        </div>
      </div>
    </>
  );
}
