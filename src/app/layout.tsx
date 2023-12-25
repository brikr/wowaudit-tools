import type { Metadata } from "next";
import "./global.scss";

export const metadata: Metadata = {
  title: "Wowaudit Roster Viewer"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-us">
      <body>
        <header>
          <h1>Wowaudit Roster</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
