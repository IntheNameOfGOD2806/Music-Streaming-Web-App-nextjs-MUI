"use client";
import PrimarySearchAppBar from "@/components/home/AppBar";
import Player from "@/components/Music/Player";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import { NextAuthWrapper } from "@/lib/next.auth.wrapper";
import { TrackContextProvider } from "@/lib/TrackContext";
// import "@etchteam/next-pagination/dist/index.css";
import PlayerAuthor from "@/components/Music/Player.Author";
import TrackContext, { ITrackContext } from "@/lib/TrackContext";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../layout.scss";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { track, setTrack } = useContext(TrackContext) as ITrackContext;
  return (
    <html lang="en">
      <body>
        <ProgressBar
          height="4px"
          color="#FCFC62"
          options={{ showSpinner: true }}
          shallowRouting
        />
        <ThemeRegistry>
          <NextAuthWrapper>
            {/* <Home Navbar/> */}
            <PrimarySearchAppBar />
            {/*  */}
            <TrackContextProvider>
              {children}
              {/* music player */}
              {track.isPlaying && (
                <div className="music-player">
                  <div style={{ display: "flex" }}>
                    <Player />
                    <PlayerAuthor></PlayerAuthor>
                  </div>
                </div>
              )}
            </TrackContextProvider>
          </NextAuthWrapper>
        </ThemeRegistry>
        <ToastContainer />
      </body>
    </html>
  );
}
