import axios from '../api/axios';
import useAuth from './useAuth';

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                id: response.data.id,
                fullname: response.data.fullname,
                mail: response.data.email, 
                accessToken: response.data.accessToken,
                number: response.data.number,
            };
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;