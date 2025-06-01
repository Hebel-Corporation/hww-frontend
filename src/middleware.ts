import { NextRequest, NextResponse } from "next/server";
import { getServerSession, updateSession } from "./utils/server-auth-utils";
import { SessionType } from "./types";
import { hasOfficeAuthorization } from "./utils/client-utils";
// import { hasAuthorization } from "./utils/client-utils";


export async function middleware(request: NextRequest) {
    // const { pathname } = request.nextUrl;
    // const skipAuthPattern  = /^\/compte(?:\/[\w-]+)*\/profil\/set-password$/.test(pathname);

    // if (skipAuthPattern) {
    //     return NextResponse.next();
    // }



    // if (pathname === '/login' && response) {
    //     const session = await getServerSession({raw: false})
    //     if (session)
    //       if (session.user.user_type === 'staff')
    //         return NextResponse.redirect(new URL('/offices/dashboard', request.url));
    //       else if (session.user.user_type === 'member')
    //         return NextResponse.redirect(new URL('/members/dashboard', request.url));
    // } else 


    try {

        const session = await getServerSession({raw: false}) as SessionType | null
        const response = await updateSession(request);
        if (!session || !response) {
            return NextResponse.redirect(new URL('/login', request.url));
        } 

        
        // Define the paths that require admin access
        const adminPaths = ['/offices/point-of-sale', '/offices/activities', '/offices/locations'];

        if (
            adminPaths.some(path => request.nextUrl.pathname.startsWith(path)) && 
            !hasOfficeAuthorization({authorizedOffices: ['head_office'], userOffice: session?.user?.office})) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }


        return response;
    } catch (err) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

}


export const config = {
    matcher: [
        '/offices/:path*'
    ],
};


