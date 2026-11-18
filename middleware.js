import { NextResponse } from 'next/server';

const PAGES = {
  '/': '/site/index.html',
  '/inscriptions': '/site/inscriptions.html',
  '/inscriptions-cours-de-salsa': '/site/inscriptions.html',
  '/mentions-legales': '/site/mentions.html',
  '/politique-de-confidentialite': '/site/confidentialite.html',
  '/blog': '/site/blog.html',
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const page = PAGES[pathname];
  if (page) {
    return NextResponse.rewrite(new URL(page, request.url));
  }

  const article = pathname.match(/^\/blog\/([a-z0-9-]+)$/);
  if (article) {
    return NextResponse.rewrite(new URL(`/site/blog/${article[1]}.html`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|site/|images/).*)'],
};
