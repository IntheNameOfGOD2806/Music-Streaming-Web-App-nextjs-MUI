import MediaControlCard from "@/components/media-card/music.card.control";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { notFound } from "next/navigation";
// import { useEffect, useState } from "react";

import "./page.scss";
import { useContext } from "react";

const profilePage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  if (!params.slug) {
    notFound();
  }
  async function getTracks() {
    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
      url: `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }api/v1/tracks/users?current=${1}&pageSize=40`,
      method: "POST",
      body: {
        id: params.slug,
      },
    });

    return tracks;
  }

  const tracks = await getTracks();
  return (
    <>
      <Container>
        <div className="music-tracks-container">
          {tracks?.data?.result?.length === 0 && <p>No tracks found</p>}
          {/* @ts-ignore */}
          {tracks &&
            // @ts-ignore
            tracks?.data.result.map((trackInfor) => {
              return <MediaControlCard trackInfo={trackInfor} />;
            })}
        </div>

        <Container>{/* <BootstrapPagination /> */}</Container>
      </Container>
    </>
  );
};

export default profilePage;
