import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// where to send folks after they are authed
const REF = "/raids";

export default function Login() {
  if (cookies().has("waKey")) {
    redirect(REF);
  }

  async function handleAuth(data: FormData) {
    "use server";
    const waKey = data.get("waKey")?.toString();
    if (waKey) {
      cookies().set("waKey", waKey, { secure: true });
    }
    redirect(REF);
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
