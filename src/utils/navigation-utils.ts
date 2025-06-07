





export const handleSearchParamChange = ({ 
    param,
    value,
    router,
    searchParams
 }: { param: string, value: string, router: any, searchParams: any }) => {

    const params = new URLSearchParams(searchParams.toString());

    params.set(param, String(value));

    router.push(`?${params.toString()}`);
};