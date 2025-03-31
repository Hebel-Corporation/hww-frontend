import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/utils/server-auth-utils';
import { ApiEndpoints } from './api-endpoints';
import { getTokenValue } from '@/utils/utils-fonctions';
import { SessionType } from '@/types';

const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Function to refresh the access token
const refreshAccessToken = async () => {
    "use server"
    try {
        const session = await getServerSession({raw: true}) as SessionType | null

        if (session) {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ApiEndpoints.AUTH.REFRESH_TOKEN}`,
                { refresh: session }
            );

            const data = response.data

            return data;
        } else {
            redirect('/');
        }
    } catch (err: any) {
        console.error('Failed to refresh access token In function:', err);
        if (err.response?.status == 406) {
            redirect('/login');
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

                const axiosInstance = axios.create({
                    headers: {
                      Authorization: `Bearer ${data_access.access}`,
                    },
                    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
                  });

                  const accessTokenValue = getTokenValue(data_access.access)
                  // Convert token expiration to milliseconds for MaxAge
                  const maxAge = accessTokenValue?.exp ? accessTokenValue.exp * 1000 - Date.now() : 0;
                  axiosInstance.defaults.headers.common['Cookie'] = `Authorization=${data_access.access}; Path=/; MaxAge=${maxAge}`;
                
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
