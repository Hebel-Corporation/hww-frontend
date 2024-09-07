"use server"

import { ApiEndpoints } from "@/lib/api-endpoints";
import serverApi from "@/lib/axios-server-instance";
import { revalidatePath } from "next/cache";



export const isFirstNodeCheck = async () => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.MEMBERS.CHECK_FIRST_NODE}`)
        const data = result.data

        return data?.is_first_node;

    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const uplinesVerificationIDs = async ({
    parrainId,
    sponsorId
}: { parrainId: string, sponsorId: string }) => {
    try {
        const result = await serverApi.post(`${ApiEndpoints.MEMBERS.CHECK_UPLINES_VALIDITY}`, {
            referral_account: parrainId,
            sponsor_account: sponsorId
        })
        const data = result.data

        if (!data?.is_valid) {
            return {
                isValid: data?.is_valid,
                path: data?.error_type?.split('_')?.map((word: string, index: number) =>
                    index === 0
                        ? word.toLowerCase()
                        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(''),
                message: data?.message
            };
        }

        return { isValid: data?.is_valid };

    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const memberRegister = (formData: {
    uplines: {
        referral_account: string,
        sponsor_account: string
    },
    member: {
        first_name: string,
        last_name: string,
        gender: string,
        birthday: Date,
        phone: string
    }
}, officeId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.post(
                `${ApiEndpoints.MEMBERS.MEMBER_REGISTER.replace("{{officeID}}", officeId)}`, {
                ...formData,
                member: {
                    ...formData.member,
                    user_type: 'member'
                }
            });
            const data = result.data;
            resolve(data);
        } catch (e: any) {
            const errorString = e?.response?.data;
            console.error(errorString);
            const match = errorString?.error.match(/string='([^']+)'/);
            const errorMessage = match ? match[1] : `${errorString?.error || "Erreur lors de la création d'un membre."}`;
            reject(new Error(errorMessage));
        } finally {
            revalidatePath(`/offices/members/${officeId}`);
        }
    });
};