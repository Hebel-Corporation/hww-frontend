export type User = {
    id: string,
    first_name: string,
    last_name: string,
    gender: string,
    birthday: string,
    email: string,
    phone: string,
    groups: UserGroup[],
    company_id: string,
    user_type: string,
    office: Office,
    downline_count: number,
    accounts_number: number,
    has_default_password: boolean,
    date_joined: string
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



export type Package = {
    id: string,
    name: string,
    price: number,
    is_default: boolean,
    description: string,
    created_at: string | Date,
    updated_at: string | Date
}



export type SubscriptionCode = {
    id: string,
    code: string,
    reccords_number: number,
    used_reccords_number: number,
    amount_paid: number,
    total_amount: number,
    office: string | Office,
    package: Package,
    is_valid: boolean,
    created_at: string | Date,
    updated_at: string | Date
}




export type SessionType = {
    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: string,
    user: User
}

