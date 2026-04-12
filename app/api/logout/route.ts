import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("http://localhost:3000/login");

  response.cookies.set("token", "", {
    expires: new Date(0),
    path: "/",
  });

  return response;
}