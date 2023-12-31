import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function AuthedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const authed = cookies().has("waKey");

  if (!authed) {
    redirect("/login");
  }

  return <>{children}</>;
}
