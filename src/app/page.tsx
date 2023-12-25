"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function Home() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const apiKey = formData.get("apiKey") as string | null;
    if (apiKey) {
      router.push(apiKey);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input name="apiKey" type="text" placeholder="API Key" />
        <button>Submit</button>
      </form>
    </main>
  );
}
