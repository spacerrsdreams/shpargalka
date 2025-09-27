import { NextResponse, type NextRequest } from "next/server";

import { handleClerkUserEvent } from "@/db/webhooks/clerk";

export async function POST(req: NextRequest) {
  try {
    const { error } = await handleClerkUserEvent(req);

    if (error) {
      throw new Error(error);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
