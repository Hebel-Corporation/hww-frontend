import { NextRequest, NextResponse } from "next/server";
import { getServerSession, updateSession } from "./utils/server-auth-utils";
import { hasAuthorization } from "./utils/client-utils";


export async function middleware(request: NextRequest) {
    // const { pathname } = request.nextUrl;
    // const skipAuthPattern  = /^\/compte(?:\/[\w-]+)*\/profil\/set-password$/.test(pathname);

    // if (skipAuthPattern) {
    //     return NextResponse.next();
    // }

    const response = await updateSession(request);

    if (!response) {
        return NextResponse.redirect(new URL('/login', request.url));
    } 

    // if (pathname === '/login' && response) {
    //     const session = await getServerSession({raw: false})
    //     if (session)
    //       if (session.user.user_type === 'staff')
    //         return NextResponse.redirect(new URL('/offices/dashboard', request.url));
    //       else if (session.user.user_type === 'member')
    //         return NextResponse.redirect(new URL('/members/dashboard', request.url));
    // } else 


    try {
        // Define the paths that require admin access
        // const adminPaths = ['/offices/point-of-sale', '/offices/rewards', '/officeslocations'];

        // if (
        //     adminPaths.some(path => request.nextUrl.pathname.startsWith(path)) && 
        //     !hasAuthorization(['Administrateur'], response.cookies.get('session')?.value)) {
        //     return NextResponse.redirect(new URL('/unauthorized', request.url));
        // }

        return response;
    } catch (err) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

}


export const config = {
    matcher: [
        '/offices/dashboard',
        '/offices/locations',
        '/offices/account',
        '/offices/point-of-sale/:path*',
        '/offices/rewards',
        '/offices/members/:path*',
        '/offices/settings',
    ],
};


