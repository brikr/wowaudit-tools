import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

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
      <form className={styles.form} action={handleAuth}>
        <input name="waKey" type="password" placeholder="API Key" />
        <button>Submit</button>
      </form>
    </main>
  );
}
