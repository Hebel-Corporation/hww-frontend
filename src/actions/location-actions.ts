'use server'

import { ApiEndpoints } from "@/lib/api-endpoints";
import serverApi from "@/lib/axios-server-instance";
import { cache } from "react";
import { revalidatePath } from "next/cache";




export const getCountries = cache(async () => {
    try {
        const result = await serverApi.get(`${ApiEndpoints.LOCATION.GET_COUNTRIES}`)
        const data = result.data
        
        return data?.results;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
})



export const CreateLocation = async ({
    name,
    countryID
} : {
    name: string,
    countryID: string
}) => {
    try {
        const result = await serverApi.post(`${ApiEndpoints.LOCATION.GET_LOCATIONS}`, {
            name : name,
            country: countryID
        })
        const data = result.data
        
        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    } finally {
        revalidatePath('/offices/locations')
    }
}



export const getLocations = async ({
    page, limit, search
}: {page: number, limit: number, search: string}) => {
    try {
        const result = await serverApi.get(
            `${ApiEndpoints.LOCATION.GET_LOCATIONS}?page${page}&limit=${limit}&search=${search}`)
        const data = result.data
        
        return data;
    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}