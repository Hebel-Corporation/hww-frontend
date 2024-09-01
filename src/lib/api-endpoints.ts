export const ApiEndpoints = {

        AUTH: {
            LOGIN: '/auth/login/',
            REFRESH_TOKEN: '/auth/token/refresh/',
            GET_USER_GROUPS: '/auth/user/groups/'
        },

        LOCATION: {
            GET_COUNTRIES: '/members/coutries/',
            GET_LOCATIONS: '/members/locations/',
        },

        OFFICES: {
            GET_OFFICES : '/members/offices/',
            GET_OFFICE_STAFFS: "/members/offices/{{officeID}}/staffs"
        },

        MEMBERS: {
            UPLINE_VERIFICATION: ''
        }
}

//{{base_url}}members/offices/a9de9768-dbaa-4b02-924d-dc63bd46adfc/staffs