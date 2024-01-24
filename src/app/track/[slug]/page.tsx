"use client";
import WaveTrack from "@/components/Music/WaveTrack";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import "./page.scss";
const DetailTrackPage = (params: { params: { slug: string } }) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("audio");

  // console.log(params);
  return (
    <Container>
      <div className="track-banner-container">
        <div className="wavetrack-container">
          <WaveTrack />
        </div>
        <div className="image-container">
          <img
            src="https://images.unsplash.com/photo-1624814448280-0f2d7d399b07?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
      <div className="music-info ">
        <div>DDDDDDDDDDDDD</div>
        <div className="author">Dattran</div>
      </div>
    </Container>
  );
};
export default DetailTrackPage;
