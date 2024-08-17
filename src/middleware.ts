import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/server-auth-utils";
import { hasAuthorization } from "./utils/client-utils";


export async function middleware(request: NextRequest) {
    return NextResponse.next();
    // const { pathname } = request.nextUrl;
    // const skipAuthPattern  = /^\/compte(?:\/[\w-]+)*\/profil\/set-password$/.test(pathname);

    // if (skipAuthPattern) {
    //     return NextResponse.next();
    // }

    // const response = await updateSession(request);

    // if (!response) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }


    // try {
    //     // Define the paths that require admin access
    //     const adminPaths = ['/point-of-sale', '/rewards', 'locations'];

    //     if (
    //         adminPaths.some(path => request.nextUrl.pathname.startsWith(path)) && 
    //         !hasAuthorization(['Administrateur'], response.cookies.get('session')?.value)) {
    //         return NextResponse.redirect(new URL('/unauthorized', request.url));
    //     }

    //     return response;
    // } catch (err) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

}


export const config = {
    matcher: [
        '/dashboard',
        '/locations',
        '/account',
        '/point-of-sale:path*',
        '/rewards',
        '/members/:path*',
        '/settings',
    ],
};


