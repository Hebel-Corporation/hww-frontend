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



export const createOffice = async (formData : {
    office: {
        name?: string,
        location: string
    },
    staff: {
        username: string,
        password: string,
        user_type?: 'staff',
        groups: string[]
    }
}) => {
    try {
        const result: any = await serverApi.post(`${ApiEndpoints.OFFICES.GET_OFFICES}`, formData)
        const data = result.data
        
        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    } finally {
        revalidatePath('/offices/point-of-sale')
    }
}



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