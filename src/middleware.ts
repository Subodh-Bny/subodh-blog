import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  console.log("Middleware is running for URL:", request.nextUrl.pathname);
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");
  // console.log(request.cookies);
  const url = request.nextUrl.clone();

  if (token && url.pathname.startsWith("/login")) {
    url.pathname = "/";
    // console.log(token, url.pathname);
    return NextResponse.redirect(url);
  }
  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/";
    // console.log(token, url.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/login", "/", "/dashboard/:path*"],
};
