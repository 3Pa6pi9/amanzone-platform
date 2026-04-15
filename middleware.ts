import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is trying to access the /admin folder
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Allow them to see the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for the secure cookie
    const session = request.cookies.get('admin_session');

    // If no valid cookie, kick them to the login screen
    if (!session || session.value !== 'authenticated_true_az_hash') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Tell Next.js to only run this check on admin routes to keep the storefront blazing fast
export const config = {
  matcher: ['/admin/:path*'],
};