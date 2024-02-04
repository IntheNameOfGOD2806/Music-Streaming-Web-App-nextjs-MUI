
import Player from "@/components/Music/Player";
import PrimarySearchAppBar from "@/components/home/AppBar";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import { NextAuthWrapper } from "@/lib/next.auth.wrapper";
import "./layout.scss";
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
            {/* <HomePage /> */}
            <PrimarySearchAppBar />

            {children}
            <div className="music-player">
              <div style={{ display: "flex" }}>
                <Player />
                <div className="music-player-author">
                  <h3 style={{ margin: "-10px 0px" }}>Author</h3>
                  <p>Authordaddadadad</p>
                </div>
              </div>
            </div>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
