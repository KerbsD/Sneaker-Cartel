import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import Loading from "../../components/Loading";

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage("persist", false)

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)
        return () => isMounted = false;
    }, [])

    return (
        <>
            {
                !persist
                    ? <Outlet />
                    : isLoading
                        ? <Loading />
                        : <Outlet />
            }
        </>
    )
}

export default PersistLogin;
