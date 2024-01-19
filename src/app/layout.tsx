import Player from "@/components/Music/Player";
import PrimarySearchAppBar from "@/components/home/AppBar";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import "./layout.scss";
import { Container } from "@mui/material";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {/* <HomePage /> */}
          <PrimarySearchAppBar />

          {children}
          <div className="music-player">
            <Container style={{display: "flex"}}>
              <Player /><div className="music-player-author">
                <h3>Author</h3>
                <p>Authordaddadadad</p>
              </div>
            </Container>
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
