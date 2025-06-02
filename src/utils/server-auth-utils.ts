import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getTokenValue } from "./utils-fonctions";
import { SessionType } from "@/types";


export async function getServerSession({
    raw
} : {
    raw: false | true
}) {
    const session = cookies().get('session')?.value
    if (!session) return null;

    if (raw)
        return session
    else 
        return getTokenValue(session)
}


export async function setServerCookie(name: string, token: string) {

    const tokenValue = getTokenValue(token)

    if (!tokenValue) {
        throw new Error('Invalid token provided')
    }

    cookies().set(name, token, {
        expires: new Date(tokenValue.exp * 1000),
        path: '/',
        secure: false,
        httpOnly: false,
        sameSite: "strict"
    });
}



export async function updateSession(request: NextRequest) {
    const session = await getServerSession({raw: false}) as SessionType | null
    if (session) {
        const res = NextResponse.next();
        const authToken = request.cookies.get('session')?.value

        if (authToken) {
            const expires = new Date(session.exp * 1000)
            res.cookies.set('session', `${authToken}`, {
                expires,
                httpOnly: false,
                path: '/'
            });
        }

        const accessToken = request.cookies.get('Authorization')?.value
        if (accessToken) {
            const decodedAuth = getTokenValue(accessToken)
            res.cookies.set('Authorization', `${accessToken}`, {
                secure: false,
                httpOnly: false,
                expires: new Date(session.exp * 1000),
                path: '/',
                sameSite: "strict"
            });
        }

        return res;
    } else {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
