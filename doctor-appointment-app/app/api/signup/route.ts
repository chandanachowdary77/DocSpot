import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = body;

  return NextResponse.json({
    message: "Account created successfully!",
    user: {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
    },
  });
}