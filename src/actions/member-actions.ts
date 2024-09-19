"use server"

import { ApiEndpoints } from "@/lib/api-endpoints";
import serverApi from "@/lib/axios-server-instance";
import { revalidatePath } from "next/cache";



export const getMembers = async () => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.MEMBERS.GET_MEMBERS}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getMemberDettails = async ({
    memberId
}: { memberId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.MEMBERS.GET_MEMBER_DETAILS.replace("{{memberID}}", memberId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}


export const getMemberAccountDownlines = async ({
    accountId
}: { accountId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_DOWNLINES.replace("{{accountID}}", accountId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getMemberAccountReferrals = async ({
    accountId
}: { accountId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_REFERRALS.replace("{{accountID}}", accountId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



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
        phone?: string
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

            revalidatePath(`/offices/members/${officeId}`);
        } catch (e: any) {
            const errorString = e?.response?.data;
            console.error(errorString);
            let message = ''

            if (errorString?.error) {
                message = errorString.error;
            } else if (errorString?.error?.match(/string='([^']+)'/)) {
                message = errorString.error.match(/string='([^']+)'/)[1];
            } else {
                message = "Erreur lors de la création du membre.";
            }

            if (typeof message !== 'string') {
                message = "Erreur inconnue.";
            }

            reject(new Error(message));
        }
    });
};


export const createMemberAccount = ({
    referral_account,
    sponsor_account,
    memberId
}: {
    referral_account: string,
    sponsor_account: string,
    memberId: string
}, officeId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.post(
                `${ApiEndpoints.MEMBERS.CREATE_MEMBER_ACCOUNT.replace("{{officeID}}", officeId)}`, {
                referral_account: referral_account,
                sponsor_account: sponsor_account,
                member: memberId
            });
            const data = result.data;
            resolve(data);

            revalidatePath(`/offices/members/${officeId}`);
        } catch (e: any) {
            const errorString = e?.response?.data;
            console.error(errorString);
            let message = ''

            if (errorString?.error) {
                message = errorString.error;
            } else if (errorString?.error?.match(/string='([^']+)'/)) {
                message = errorString.error.match(/string='([^']+)'/)[1];
            } else {
                message = "Erreur lors de la création du membre.";
            }

            if (typeof message !== 'string') {
                message = "Erreur inconnue.";
            }

            reject(new Error(message));
        }
    });
};