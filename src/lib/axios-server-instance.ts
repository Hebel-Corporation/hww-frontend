import { getServerSession } from '@/_utils/user';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { endpointList } from './api-endpoint-list';
import { setServerCookie } from '@/_actions/actions';
import customCookies from './customCookies';

const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_INSTITUTION_API_BASE_URL,
});

// Function to refresh the access token
const refreshAccessToken = async () => {
    "use server"
    try {
        const session = await getServerSession()

        if (session) {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_INSTITUTION_API_BASE_URL}${endpointList.AUTH.REFRESH_TOKEN}`,
                { refresh: session.refreshToken }
            );

            const data = response.data
            // console.log("REFREEEEEEESSSSSSSSSSSSSSSH ******************", data)
            // setServerCookie('Authorization', data.access, data.token_duration.access)
            // customCookies.set('Authorization', data.access, data.token_duration.access)

            // cookies().set('Authorization', data.access, {
            //     expires: new Date(Date.now() + data.token_duration.access * 1000),
            //     path: '/',
            //     secure: false,
            //     httpOnly: false
            // });

            // response.headers['set-cookie'] = [`Authorization=${data.access}; Path=/; MaxAge=${Date.now() + Number(data.token_duration.access) * 1000}`];

            return data;
        } else {
            redirect('/');
        }
    } catch (err: any) {
        console.error('Failed to refresh access token In function:', err);
        if (err.response?.status == 406) {
            redirect('/');
        }else {
            throw err
        }
    }
};

// Request interceptor to add the access token to headers
serverApi.interceptors.request.use(
    (config) => {
        const token = cookies().get('Authorization')?.value;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
serverApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const data_access = await refreshAccessToken();
                // originalRequest.headers['Authorization'] = `Bearer ${data_access.access}`;

                const axiosInstance = axios.create({
                    headers: {
                      Authorization: `Bearer ${data_access.access}`,
                    },
                    baseURL: process.env.NEXT_PUBLIC_INSTITUTION_API_BASE_URL,
                  });

                  axiosInstance.defaults.headers.common['Cookie'] = `Authorization=${data_access.access}; Path=/; MaxAge=${Date.now() + Number(data_access.token_duration.access) * 1000}`;
                
                // return originalRequest;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default serverApi;
