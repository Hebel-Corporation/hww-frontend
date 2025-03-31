'use server'


import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import serverApi from "@/lib/axios-server-instance";
import { cache } from "react";
import { encrypt } from "@/utils/client-utils";
import { ApiEndpoints } from "@/lib/api-endpoints";
import { setServerCookie } from "@/utils/server-auth-utils";
import { getTokenValue } from "@/utils/utils-fonctions";
import { SessionType } from "@/types";



export async function userLogin({
    username,
    password
}: {
    username: string,
    password: string
}) {

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiEndpoints.AUTH.LOGIN}`,
            {
                username: username,
                password: password
            }
        );

        const tokens = res.data
        setServerCookie("Authorization", tokens.access)
        setServerCookie("session", tokens.refresh)

        const accessTokenValue : SessionType | null = getTokenValue(tokens.access)
        if (!accessTokenValue) {
            throw new Error("Failed to decode access token")
        }

        if (
            accessTokenValue.user.user_type === 'staff' || 
            accessTokenValue.user.user_type === 'admin' ||
            accessTokenValue.user.user_type === 'member'
        ) {
            if (accessTokenValue.user.user_type === 'member' && accessTokenValue.user.has_default_password) {
                return { redirectUrl: '/offices/account/config-password', IsloggedIn: true }
            }
            return { redirectUrl: '/offices/dashboard', IsloggedIn: true };
        } else {
            return { redirectUrl: '/unauthorized', IsloggedIn: false };
        }

    } catch (e: any) {
        console.error("ERROR > : ", e)

        if (e?.response?.status == 401)
            return {mssg: "Mot de passe ou nom d'utilisateur incorrect.", IsloggedIn: false, redirectUrl: ''}

        return {mssg: e?.message, IsloggedIn: false, redirectUrl: ''}
    }

}


export async function userLogout() {
    cookies().delete('session');
    cookies().delete('Authorization');
}


export const getUserDettails = async ({
    userId
}: { userId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.AUTH.GET_USER_DETAILS.replace("{{userID}}", userId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getUserApiGroups = cache(async () => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.AUTH.GET_USER_GROUPS}`)
        const data = result.data

        return data.results;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
})




export const changeUserPassword = (passwordFormData: {
    old_password: string,
    new_password: string,
    confirm_password: string
}): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.put(
                `${ApiEndpoints.AUTH.CHANGE_USER_PASSWORD}`, {
                ...passwordFormData
            });
            const data = result.data;
            resolve(data);

        } catch (e: any) {
            const errorString = e?.response?.data;
            console.error(errorString);
            let message = ''

            if (errorString?.old_password) {
                message = errorString?.old_password?.message;
            } else if (message = errorString?.new_password) {
                message = errorString?.new_password[0]
            }
            else {
                message = String(errorString);
            }

            reject(new Error(message));
        }
    });
};
