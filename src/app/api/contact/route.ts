import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  // ✅ Log the submission to your terminal
  console.log("📩 New Contact Form Submission:", body)

  return NextResponse.json({ success: true })
}
