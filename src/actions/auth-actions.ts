'use server'


import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import serverApi from "@/lib/axios-server-instance";
import { cache } from "react";
import { encrypt } from "@/utils/client-utils";
import { ApiEndpoints } from "@/lib/api-endpoints";


export async function userLogin(formData: any) {

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiEndpoints.AUTH.LOGIN}`,
            {
                username: formData.email,
                password: formData.password
            }
        );

        const login_data = res.data

        const refreshToken = login_data.token.refresh
        const collaborator = login_data.collaborator
        const expires = new Date(Date.now() + Number(login_data.token_duration.refresh) * 1000)
        const session = await encrypt({
            collaborator,
            expires,
            refreshToken
        }, expires);

        cookies().set("Authorization", login_data.token.access, {
            secure: false,
            httpOnly: true,
            expires: new Date(Date.now() + Number(login_data.token_duration.access) * 1000),
            path: '/',
            sameSite: "strict"
        })

        cookies().set("session", session, {
            expires,
            httpOnly: true,
            path: '/'
        })

    } catch (e: any) {
        console.error(e)
        return e?.message || "Mot de passe ou nom d'utilisateur incorrect."
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




