import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./client-utils";


const jwt = require('jsonwebtoken');

export async function getServerSession() {
    const session = cookies().get('session')?.value
    if (!session) return null;

    try {
        const sessionParsed = await decrypt(session)
        return sessionParsed
    } catch (error) {
        return null
    }
}


export async function setServerCookie(name: string, value: string, exp: number) {
    cookies().set(name, value, {
        expires: new Date(Date.now() + exp * 1000),
        path: '/',
        secure: false,
        httpOnly: false
    });
}



export async function updateSession(request: NextRequest) {
    const session = await getServerSession()

    if (session) {
        const res = NextResponse.next();
        const authToken = request.cookies.get('session')?.value

        if (authToken) {
            const expires = new Date(session.expires)
            res.cookies.set('session', `${authToken}`, {
                expires,
                httpOnly: false,
                path: '/'
            });
        }

        const token = request.cookies.get('Authorization')?.value
        if (token) {
            const decodedAuth = jwt.decode(token, { complete: true });
            res.cookies.set('Authorization', `${token}`, {
                secure: false,
                httpOnly: false,
                expires: new Date(Number(decodedAuth.payload.exp) * 1000),
                path: '/',
                sameSite: "strict"
            });
        }

        return res;
    } else {
        return NextResponse.redirect(new URL('/', request.url));
    }
}


