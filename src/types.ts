export type User = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    groups: UserGroup[],
    company_id: string,
    user_type: string,
    office: Office
}

export type UserGroup = {
    id: string,
    name: string
}


export type Country = {
    id: string,
    name: string,
    code: string,
    created_at: string,
}


export type Location = {
    id: string,
    name: string,
    country: Country,
    created_at: string,
}


export type Office = {
    id: string,
    name: string,
    members_count: number,
    subscription_rate: number,
    office_code: string,
    location: Location,
    office_type: string,
    is_active: string,
    created_at: string,
}

