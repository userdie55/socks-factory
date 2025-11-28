import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,      // должно быть http://localhost:3000/api
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// accessToken хранится в памяти
let accessToken = '';

// обновляем токен
export function setAccessToken(token) {
    accessToken = token;
}

// каждый запрос → добавляем Authorization
axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// перехватчик ошибок
axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        // если токен истёк (403) и мы ещё не пытались обновить
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 🔥 ВАЖНО: правильный путь к refreshToken
                const res = await axiosInstance.get('/auth/refreshToken');

                const newToken = res.data.accessToken;

                if (!newToken) {
                    throw new Error('Refresh returned no token');
                }

                setAccessToken(newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return axiosInstance(originalRequest);

            } catch (err) {
                // refresh не сработал → отправляем на логин
                setAccessToken('');
                window.location.href = '/signIn';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

