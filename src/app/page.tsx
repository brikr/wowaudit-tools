import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  if (cookies().has("waKey")) {
    redirect("/raids");
  }

  async function handleAuth(data: FormData) {
    "use server";
    const waKey = data.get("waKey")?.toString();
    if (waKey) {
      cookies().set("waKey", waKey, { secure: true });
    }
  }

  return (
    <main>
      <form action={handleAuth}>
        <input name="waKey" type="text" placeholder="API Key" />
        <button>Submit</button>
      </form>
    </main>
  );
}
