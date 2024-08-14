import clientCookie from "@/lib/client-cookie";
import { SignJWT, jwtVerify } from "jose";


const jwt = require('jsonwebtoken');

const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)

export async function encrypt(payload: any, exp: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(secretKey)
}


export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, secretKey, {
        algorithms: ["HS256"],
    });
    return payload;
}


export function getClientSession() {
    const session = clientCookie.get('session')
    if (!session) return null;

    try {
        const decodedSession = jwt.decode(session, { complete: true });
        // const sessionParsed = await decrypt(session)
        return decodedSession?.payload
    } catch (error) {
        return null
    }
}


export const getUserInfo = async () => {

    const session = clientCookie.get('session')
    if (!session) return;

    const parsed = await decrypt(session);
    const collaborator = parsed;

    return collaborator
}



export const getUserGroups = (sessionParams?: any) => {
    let session: any 
    if (sessionParams) {
        session = sessionParams
    } else {
        session = clientCookie.get('session')
    }
    const decodedToken = jwt.decode(session, { complete: true });
    if (decodedToken) {
        const arr = decodedToken?.payload?.collaborator?.user?.groups.map((g: any) => { return g?.name })
        return arr
    }
    else return []
}


export function hasAuthorization(arr: string[], session?: any) {

    if (!arr.length) return false

    try {
        const subarr = getUserGroups(session)
        return subarr.some((group: string) => arr.includes(group));
    } catch (e) {
        return false
    }

}





