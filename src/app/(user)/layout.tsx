"use client";
import Player from "@/components/Music/Player";
import PrimarySearchAppBar from "@/components/home/AppBar";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import { NextAuthWrapper } from "@/lib/next.auth.wrapper";
import { TrackContextProvider } from "@/lib/TrackContext";
import "@etchteam/next-pagination/dist/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../layout.scss";
import PlayerAuthor from "@/components/Music/Player.Author";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            {/* <Home Navbar/> */}
            <PrimarySearchAppBar />
            {/*  */}
            <TrackContextProvider>
              {children}
              {/* music player */}
              <div className="music-player">
                <div style={{ display: "flex" }}>
                  <Player />
                  <PlayerAuthor></PlayerAuthor>
                </div>
              </div>
            </TrackContextProvider>
          </NextAuthWrapper>
        </ThemeRegistry>
        <ToastContainer />
      </body>
    </html>
  );
}
