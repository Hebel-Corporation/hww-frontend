import clientCookie from "@/lib/client-cookie";
import { Office, UserGroup } from "@/types";
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


export function hasGroupAuthorization(arr: string[], groups?: UserGroup[]) {

    if (!arr.length) return false

    try {

        let group_instances: UserGroup[]
        if (groups){
            group_instances = groups
        }else {
            group_instances = getClientSession()?.user?.groups
        }

        const subarr = group_instances.map((g: UserGroup) => { return g?.name })
        return subarr.some((group: string) => arr.includes(group));
    } catch (e) {
        return false
    }

}


export function hasOfficeAuthorization(arr: string[], office?: Office) {

    if (!arr.length) return false

    try {
        let office_instance: Office
        if (office){
            office_instance = office
        }else {
            office_instance = getClientSession()?.user?.office
        }
        return arr.some((type: string) => type === office_instance?.office_type);
    } catch (e) {
        return false
    }

}





