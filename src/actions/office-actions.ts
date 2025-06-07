'use server'

import { ApiEndpoints } from "@/lib/api-endpoints";
import serverApi from "@/lib/axios-server-instance";
import { revalidatePath } from "next/cache";



export const getCompanyPackages = async () => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.OFFICES.GET_COMPANY_PACKAGE}`)
        const data = result.data

        return data.results;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}




export const getOffices = async ({
    page, limit, search
}: {page: number, limit: number, search: string}) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.OFFICES.GET_OFFICES}?page=${page}&limit=${limit}&search=${search}`)
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
    officeId, search
}: { officeId: string, search: string }) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.OFFICES.GET_OFFICE_STAFFS.replace("{{officeID}}", officeId)}?search=${search}`)
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


export const getOfficeRegisterCodes = async ({
    officeId
}: { officeId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.OFFICES.GET_OFFICE_REGISTER_CODES.replace("{{officeID}}", officeId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const checkOfficeRegisterCodeValidity = async ({
    officeId
}: { officeId: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.OFFICES.CHECK_OFFICE_REGISTER_CODE_VALIDITY.replace("officeID", officeId)}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}




export const createOfficeRegisterCode = (formData: {
    package: string,
    codeNumber: number,
    amount: number
}, officeId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result: any = await serverApi.post(
                `${ApiEndpoints.OFFICES.CREATE_OFFICE_REGISTER_CODE.replace("officeID", officeId)}`, {
                ...formData
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
                message = "Erreur lors de la génération des codes d'enregistrement";
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



export const getOfficeStats = async ({
    officeId,
    officeFilter
}: { officeId: string, officeFilter: string }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.OFFICES.GET_OFFICE_STATS.replace("{{officeID}}", officeId)}?office_id=${officeFilter}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}



export const getOfficeActivities = async ({
    officeId, filterSlug, activity_type, page, officeFilter
}: { 
    officeId: string, 
    filterSlug: string,
    activity_type: 'TOTALS' | 'DETAILS',
    page?: number,
    officeFilter?: string
 }) => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.OFFICES.GET_OFFICE_ACTIVITIES.replace("{{officeID}}", officeId)}?filter=${filterSlug}&activity_type=${activity_type}&page=${page}&office_filter=${officeFilter}`)
        const data = result.data

        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}