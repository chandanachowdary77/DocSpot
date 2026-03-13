<<<<<<< HEAD
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
=======
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
>>>>>>> c26d7a8c109e0da026331a219692bdbf92102fd1
}