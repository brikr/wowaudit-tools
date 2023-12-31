"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    router.push("/logout");
    router.refresh();
  }

  return <button onClick={handleLogout}>Log out</button>;
}
