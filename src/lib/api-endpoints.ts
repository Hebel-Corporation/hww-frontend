export const ApiEndpoints = {

        AUTH: {
            LOGIN: '/auth/login/',
            REFRESH_TOKEN: '/auth/token/refresh/',
            GET_USER_GROUPS: '/auth/user/groups/'
        },

        LOCATION: {
            GET_COUNTRIES: '/members/countries/',
            GET_LOCATIONS: '/members/locations/',
        },

        OFFICES: {
            GET_OFFICES : '/members/offices/',
            GET_COMPANY_PACKAGE : '/members/packages/',
            GET_OFFICE_STAFFS: "/members/offices/{{officeID}}/staffs/",
            CREATE_OFFICE_STAFF: "/members/offices/{{officeID}}/create-staff/",
            GET_OFFICE_REGISTER_CODES: "/members/offices/{{officeID}}/get-register-codes/",
            CHECK_OFFICE_REGISTER_CODE_VALIDITY: "/members/offices/{{officeID}}/check-register-code-validity/",
            CREATE_OFFICE_REGISTER_CODE: "/members/offices/{{officeID}}/generate-register-code/",
        },

        MEMBERS: {
            GET_MEMBERS: '/members/users/members/',
            GET_MEMBER_DETAILS: '/members/users/{{memberID}}/member-details/',
            GET_MEMBER_ACCOUNT_DOWNLINES: '/members/accounts/{{accountID}}/member-downlines/',
            GET_MEMBER_ACCOUNT_REFERRALS: '/members/accounts/{{accountID}}/member-referrals/',
            CHECK_UPLINES_VALIDITY: '/members/accounts/check-uplines-validity/',
            MEMBER_REGISTER: '/members/offices/{{officeID}}/member-registration/',
            CREATE_MEMBER_ACCOUNT: '/members/offices/{{officeID}}/member-registration-account/',
            CHECK_FIRST_NODE: '/members/accounts/is-first-node/'
        }
}
