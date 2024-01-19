import Carousel from "@/components/carousel/carousel";
import TrackCarousel from "@/components/carousel/trackCarousel";
import PrimarySearchAppBar from "@/components/home/AppBar";
import wretch from "wretch";
import { sendRequestJS } from "../utils/old.api";
import { sendRequest } from "../utils/api";


export default async function HomePage() {
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
  // const res2 = await sendRequest<IUser>({
  //   url: "http://localhost:8000/api/v1/tracks/top",
  //   method: "POST",
  //   body: {
  //     category: "CHILL",
  //     limit: 10,
  //   },
  // });
  // console.log(res2);

  return (
    <>
      <div style={{ width: "100%", margin: "auto" }}>
        <Carousel />
        <div style={{ width: "90%", margin: "auto" }}>
          <TrackCarousel />
          <TrackCarousel />
        </div>
      </div>
    </>
  );
}
