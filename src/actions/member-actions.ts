"use server"

import { ApiEndpoints } from "@/lib/api-endpoints";
import serverApi from "@/lib/axios-server-instance";
import { isValid } from "zod";



export const uplinesVerificationIDs = async ({
    parrainID,
    sponsorID
}: { parrainID: string, sponsorID: string }) => {
    try {
        // const result = await serverApi.post(`${ApiEndpoints.MEMBERS.UPLINE_VERIFICATION}`, {
        //     parrain_id: parrainID,
        //     sponsor_id: sponsorID
        // })
        // const data = result.data
        const data = {
            parrain: {
                isValid: false
            },
            sponsor: {
                isValid: false
            }
        }

        if (!data?.parrain?.isValid) {
            return { isValid: false, path: 'parrainID', message: "Le parrain ayant cet ID n'existe pas." };
        }

        if (!data?.sponsor?.isValid) {
            return { isValid: false, path: 'sponsorID', message: "Ce sponsor a déjà atteint la limite des downslines direct." };
        }

        return { isValid: true };

    } catch (e: any) {
        console.error(e?.message)
        return e?.message;
    }
}