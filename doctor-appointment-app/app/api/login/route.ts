import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.email && body.password) {
    return NextResponse.json({
      message: "Login successful",
      token: "mock-jwt-token-12345",
    });
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}