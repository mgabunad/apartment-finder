import { NextResponse, type NextRequest } from "next/server";

// Runs before /admin pages. Asks the browser for a password (HTTP Basic Auth)
// and only lets the request through if it matches ADMIN_PASSWORD.
export function proxy(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  const header = request.headers.get("authorization");

  if (password && header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const supplied = decoded.slice(decoded.indexOf(":") + 1);
    if (supplied === password) return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
  });
}

export const config = { matcher: ["/admin/:path*"] };
