import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export function GET() {
  cookies().delete("waKey");
  redirect("/login");
}
