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
            GET_OFFICE_STAFFS: "/members/offices/{{officeID}}/staffs/",
            CREATE_OFFICE_STAFF: "/members/offices/{{officeID}}/create-staff/",
        },

        MEMBERS: {
            GET_MEMBERS: '/members/users/members/',
            CHECK_UPLINES_VALIDITY: '/members/accounts/check-uplines-validity/',
            MEMBER_REGISTER: '/members/offices/{{officeID}}/member-registration/',
            CHECK_FIRST_NODE: '/members/accounts/is-first-node/'
        }
}
