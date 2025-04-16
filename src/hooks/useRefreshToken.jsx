import axios from '../api/axios';
import useAuth from './useAuth';

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,
                id: response.data.id,
                fullname: response.data.fullname,
                mail: response.data.email, 
                accessToken: response.data.accessToken,
                number: response.data.number,
                address: response.data.address
            };
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;