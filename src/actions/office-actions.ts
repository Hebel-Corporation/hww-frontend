'use server'

import { ApiEndpoints } from "@/lib/api-endpoints";
import serverApi from "@/lib/axios-server-instance";
import { revalidatePath } from "next/cache";




export const getOffices = async () => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.OFFICES.GET_OFFICES}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getOfficeDetails = async ({
    officeId
}: { officeId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.OFFICES.GET_OFFICES}${officeId}/`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}




export const getOfficeStaffs = async ({
    officeId
}: { officeId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.OFFICES.GET_OFFICE_STAFFS.replace("officeID", officeId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const createOffice = (formData: {
    office: {
        name?: string,
        location: string
    },
    staff: {
        username: string,
        password: string,
        groups: string[]
    }
}): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.post(`${ApiEndpoints.OFFICES.GET_OFFICES}`, {
                ...formData,
                staff: {
                    ...formData.staff,
                    user_type: 'staff'
                }
            });
            const data = result.data;
            resolve(data);
        } catch (e: any) {
            const errorString = e?.response?.data;
            console.error(errorString);
            const match = errorString?.error.match(/string='([^']+)'/);
            const errorMessage = match ? match[1] : `${errorString?.error || "Erreur lors de l'enregistrement"}`;
            reject(new Error(errorMessage));
        } finally {
            revalidatePath('/offices/point-of-sale');
        }
    });
};



export const createOfficeStaff = (formData: {
    first_name: string,
    last_name: string,
    gender: string,
    username: string,
    password: string,
    groups: string[]
}, officeId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.post(
                `${ApiEndpoints.OFFICES.CREATE_OFFICE_STAFF.replace("officeID", officeId)}`, {
                ...formData,
                user_type: 'staff'
            });
            const data = result.data;
            resolve(data);
            
            revalidatePath(`/offices/point-of-sale/${officeId}`);
        } catch (e: any) {
            const errorString = e?.response?.data;
            console.error("ERROR : ", errorString);
            let message = ''
            
            if (errorString?.username) {
                message = errorString.username[0];
            } else if (errorString?.error) {
                message = errorString.error;
            } else if (errorString?.error?.match(/string='([^']+)'/)) {
                message = errorString.error.match(/string='([^']+)'/)[1];
            } else {
                message = "Erreur lors de la création d'un staff.";
            }

            if (typeof message !== 'string') {
                message = "Erreur inconnue.";
            }

            reject(new Error(message));
        }
    });
};




export const editOffice = async ({
    officeID,
    name,
    locationID
}: {
    officeID: string,
    name?: string,
    locationID?: string,
}) => {
    try {
        const result = await serverApi.patch(`${ApiEndpoints.OFFICES.GET_OFFICES}${officeID}/`, {
            name: name,
            location: locationID
        })
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    } finally {
        revalidatePath('/offices/point-of-sale')
    }
}