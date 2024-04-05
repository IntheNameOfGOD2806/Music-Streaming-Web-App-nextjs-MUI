import type { Metadata } from "next"
 
export const metadata: Metadata = {
  title: 'Music App By Dattran',
  description: 'A simple music app for homies',
  openGraph: {
    images: 'https://source.unsplash.com/random',
  }
}
 
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          {/* Layout UI */}
          <main>{children}</main>
        </body>
      </html>
    )
  }