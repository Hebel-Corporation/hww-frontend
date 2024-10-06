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


export function hasGroupAuthorization({
    authorizedGroups,
    userGroups
}: {authorizedGroups: string[], userGroups?: UserGroup[]}) {

    if (!authorizedGroups.length) return false

    try {

        let group_instances: UserGroup[]
        if (userGroups){
            group_instances = userGroups
        }else {
            group_instances = getClientSession()?.user?.groups
        }

        const subarr = group_instances.map((g: UserGroup) => { return g?.name })
        return subarr.some((group: string) => authorizedGroups.includes(group));
    } catch (e) {
        return false
    }

}


export function hasOfficeAuthorization({
    authorizedOffices,
    userOffice
} : {authorizedOffices: string[], userOffice?: Office}) {

    if (!authorizedOffices.length) return false

    try {
        let office_instance: Office
        if (userOffice){
            office_instance = userOffice
        }else {
            office_instance = getClientSession()?.user?.office
        }
        return authorizedOffices.some((type: string) => type === office_instance?.office_type);
    } catch (e) {
        return false
    }

}





