"use client";
import WaveTrack from "@/components/Music/WaveTrack";
import { useSearchParams } from "next/navigation";
const DetailTrackPage = (params: { params: { slug: string } }) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("audio");
  console.log(search);

  // console.log(params);
  return <div>

    <WaveTrack />

  </div>;
};
export default DetailTrackPage;
