"use server"

import { ApiEndpoints } from "@/lib/api-endpoints";
import serverApi from "@/lib/axios-server-instance";
import { revalidatePath } from "next/cache";
import { format } from 'date-fns';



export const getMembers = async ({
    page,
    limit, search
} : {
    page: number,
    limit: number, search: string
}) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.MEMBERS.GET_MEMBERS}?page=${page}&limit=${limit}&search=${search}`)
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


export const getMemberAccountDetails = async ({
    accountId
}: { accountId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_DETAILS.replace("{{accountID}}", accountId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getMemberAccountNetwork = async ({
    accountId
}: { accountId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_NETWORK.replace("{{accountID}}", accountId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getMemberAccountDownlines = async ({
    accountId,
    page,
    limit, search
}: { accountId: string, page: number, limit: number, search: string }) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_DOWNLINES.replace("{{accountID}}", accountId)}?page=${page}&limit=${limit}&search=${search}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getMemberAccountSponsors = async ({
    accountId
}: { accountId: string }) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_SPONSORS.replace("{{accountID}}", accountId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getMemberAccountReferrals = async ({
    accountId, page, limit, search, is_paid
}: { accountId: string, page: number, limit: number, search:string, is_paid?: boolean }) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_REFERRALS.replace("{{accountID}}", accountId)}?page${page}&limit=${limit}&search=${search}&is_paid=${is_paid}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}


export const getMemberAccountPurchases = async ({
    accountId, page, limit, search, is_paid
}: { accountId: string, page: number, limit: number, search:string, is_paid?: boolean }) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_PURCHASES.replace("{{accountID}}", accountId)}?page${page}&limit=${limit}&search=${search}&is_paid=${is_paid}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}




export const getMemberAccountMatchings = async ({
    accountId, page, limit, search, is_paid
}: { accountId: string, page: number, limit: number, search: string, is_paid?: boolean }) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_MATCHINGS.replace("{{accountID}}", accountId)}?page=${page}&limit=${limit}&search=${search}&is_paid=${is_paid}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}


export const getMemberAccountpayments = async ({
    accountId, page, limit, search
}: { accountId: string, page: number, limit: number, search: string }) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.MEMBERS.GET_MEMBER_ACCOUNT_PAYMENTS.replace("{{accountID}}", accountId)}?page=${page}&limit=${limit}&search=${search}`)
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
                    birthday: format(formData.member.birthday, "yyyy-MM-dd"),
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



export const memberUpdate = (formData: {
    first_name: string,
    last_name: string,
    gender: string,
    birthday: Date,
    phone?: string
}, memberId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.patch(
                `${ApiEndpoints.MEMBERS.MEMBER_UPDATE.replace("{{memberID}}", memberId)}`, {
                ...formData,
                birthday: format(formData.birthday, "yyyy-MM-dd")
            });
            const data = result.data;
            resolve(data);

            revalidatePath(`/offices/members`);
        } catch (e: any) {
            const errorString = e?.response?.data;
            console.error(errorString);
            let message = ''

            if (errorString?.error) {
                message = errorString.error;
            } else if (errorString?.error?.match(/string='([^']+)'/)) {
                message = errorString.error.match(/string='([^']+)'/)[1];
            } else {
                message = "Erreur lors de la mise à jour.";
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




export const registerMemberPurchase = ({
    accountID,
    amount
}: {
    accountID: string,
    amount: number
}, officeId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.post(
                `${ApiEndpoints.MEMBERS.CREATE_MEMBER_PURCHASE.replace("{{officeID}}", officeId)}`, {
                accountID: accountID,
                amount: Number(amount)
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




export const registerMemberPayment = ({
    payment_type,
    account,
    amount,
    bonuses
}: {
    payment_type: string,
    account: string,
    amount: number, bonuses: string[]
}, officeId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.post(
                `${ApiEndpoints.MEMBERS.REGISTER_MEMBER_PAYMENT.replace("{{officeID}}", officeId)}`, {
                payment_type: payment_type,
                account: account,
                amount: amount,
                bonuses: bonuses
            });
            const data = result.data;
            resolve(data);

            revalidatePath(`/offices/members/${officeId}/${account}/payments`);
        } catch (e: any) {
            const errorString = e?.response?.data;
            console.error(errorString);
            let message = ''

            if (errorString?.error) {
                message = errorString.error;
            } else if (errorString?.error?.match(/string='([^']+)'/)) {
                message = errorString.error.match(/string='([^']+)'/)[1];
            } else {
                message = "Erreur lors d'enregistrement du paiement'.";
            }

            if (typeof message !== 'string') {
                message = "Erreur inconnue.";
            }

            reject(new Error(message));
        }
    });
};