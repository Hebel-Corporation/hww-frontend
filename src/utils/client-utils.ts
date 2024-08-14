import { SignJWT, jwtVerify } from "jose";
import customCookies from "@/lib/customCookies"
import { Group } from "@/_types/collaborators";


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
    const session = customCookies.get('session')
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

    const session = customCookies.get('session')
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
        session = customCookies.get('session')
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



export function canUnassignFile({
    session,
    assignGroupName
} : {
    session?: any,
    assignGroupName: string
}) {

    let userGroups : string[]
    if (session) {
        userGroups = session.collaborator.user.groups.map((grp: Group) => { return grp.name })
    }else {
        userGroups = getUserGroups()
    }

    switch (assignGroupName) {
        case 'Vérificateur':
            return userGroups.includes('Administrateur');

        case 'Analyste':
            return userGroups.includes('Vérificateur');
    
        default:
            return false;
    }

}




