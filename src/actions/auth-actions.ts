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
import { redirect } from "next/navigation";



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

        const accessTokenValue = getTokenValue(tokens.access)

        if (accessTokenValue.user.user_type === 'staff' || accessTokenValue.user.user_type === 'admin') {
            return { redirectUrl: '/offices/dashboard', IsloggedIn: true };
        } else if (accessTokenValue.user.user_type === 'member') {
            return { redirectUrl: '/members/dashboard', IsloggedIn: true };
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




