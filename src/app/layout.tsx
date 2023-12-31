import type { Metadata } from "next";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import "./global.scss";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Wowaudit Roster"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const authed = cookies().has("waKey");

  return (
    <html lang="en-us">
      <body>
        <header className={styles.header}>
          <h1>Wowaudit Roster</h1>
          {authed && <LogoutButton />}
        </header>
        {children}
      </body>
    </html>
  );
}
