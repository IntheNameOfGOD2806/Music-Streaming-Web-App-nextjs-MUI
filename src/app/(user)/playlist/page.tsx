import { Container } from "@mui/material";
import "./page.scss";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SuperAccordion from "@/components/PlaylistPage/Accordion";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreatePlaylistDialog from "@/components/PlaylistPage/Dialog";
import PlaylistSection from "@/components/PlaylistPage/Playlist.Section";
const playlistPage = async () => {
  const session = await getServerSession(authOptions);
  const playlists = await sendRequest<IBackendRes<PlayListData>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/playlists/by-user?current=1&pageSize=100`,
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
    },
    nextOption: {
      next: { tags: ["playlists"] },
    },
  });
  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <>
      <Container>
        <div className="playlist-section-wrapper">
          <Container>
          
            <PlaylistSection playlists={playlists?.data!} />
            <div className="playlist-section-divider">
              <hr />
            </div>
            <div className="playlist-accordion">
              <SuperAccordion playlists={playlists?.data!} />
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
};
export default playlistPage;
