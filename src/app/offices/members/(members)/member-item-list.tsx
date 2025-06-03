// 'use client'

// import { getMembers } from "@/actions/member-actions"
// import EmptyData from "@/components/common/empty-data"
// import PaginationControls from "@/components/common/pagination-controls"
// import MemberItem from "@/components/member-item"
// import { ScrollShadow } from "@heroui/react"
// import { useQuery } from "@tanstack/react-query"

// export function MemberItemList({page, limit, search}:{
//     page: number, limit: number, search: string
// }) {

//     const { data, error, isLoading, isError } = useQuery({  
//         queryKey: ['memberList', page],
//         queryFn: () => getMembers({ page: page, limit: limit, search: search }),
//         enabled: !!page
//     })

//     console.log("=======>>>>>>>>>", data, page)
    
//     return (
//         <div className="flex flex-col gap-2">
//             <ScrollShadow className="flex flex-col flex-1 max-h-[70dvh] min-h-[70dvh]">
//               {
//                 data?.count ?
//                   <div className='flex flex-col'>
//                     {
//                       data?.results?.map((member: any) => (
//                         <MemberItem key={member.id} member={member} />
//                       ))
//                     }
//                   </div>
//                   :
//                   <EmptyData description='Aucun membre enregistrer pour le moment.' />
//               }
//             </ScrollShadow>
    
//             <PaginationControls
//                 limit={limit}
//                 page={page}
//                 total_pages={data?.total_pages}
//             />
//         </div>
//     )
// }