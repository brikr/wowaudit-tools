import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: {
    rest: string[];
  };
}

export async function GET(
  request: NextRequest,
  context: Context
): Promise<NextResponse> {
  const endpoint = context.params.rest.join("/");
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) {
    return NextResponse.json({ error: "No API key" }, { status: 400 });
  }

  const waResponse = await fetch(`https://wowaudit.com/${endpoint}`, {
    headers: { Authorization: request.headers.get("Authorization") ?? "" }
  });
  const json = await waResponse.json();

  return NextResponse.json(json);
}
