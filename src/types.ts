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




export type AccountType = {
    id: string,
    member: User,
    company_id: string,
    referral_account?: AccountType | null,
    parent?: AccountType | null,
    position: string,
    pvs: number,
    office: Office,
    rewards: RewardType[],
    promotions: PromotionItemType[],
    is_active: boolean,
    created_at: string
}


type SaleDetailType = {
    id: string,
    member_account: AccountType,
    amount: number,
    office: Office,
    created_at: string,
    updated_at: string
}


type BonusBaseType = {
    id: string,
    grantee: AccountType,
    amount: number,
    is_paid: boolean,
    created_at: string,
    updated_at: string,
    amount_to_be_paid?: number
}



export type MatchingType = BonusBaseType & {
    downlines: AccountType,
    is_validated: boolean
}



export type ReferralType = BonusBaseType & {
    downline: AccountType
}


export type PurchaseType = BonusBaseType & {
    sale_detail: SaleDetailType
}



export type GiftType = {
    id: string,
    name: string,
    image: string,
    mark: string | null,
    created_at: string,
    updated_at: string
}




export type PromotionType = {
    id: string,
    title: string,
    description: string,
    start_date: string,
    end_date: string,
    is_active: boolean,
    created_at: string,
    updated_at: string,
    qualification_bonus_count: number,
    total_bonus_concerned: number,
    account_qualification_count: number,
    members?: {
        count: number,
        total_pages: number,
        next?: string,
        previous?: string,
        results: AccountType[]
    }
}

export type PromotionItemType = {
    id: string,
    promotion: PromotionType,
    gift: GiftType,
    qualification_count: number,
    title: string,
    description: string,
    is_active: boolean,
    created_at: string,
    updated_at: string,
    equivalent_amount: string,
    unit_number: number,
    unit_type: string,
    unit_type_display: string
}



export type RewardType = {
    id: string,
    gift: GiftType,
    qualification_count: number,
    title: string,
    description: string,
    is_active: boolean,
    created_at: string,
    updated_at: string,
    equivalent_amount: string,
    unit_number: number,
    unit_type: string
}


