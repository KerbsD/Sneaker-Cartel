import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import Animate from "react-smooth";
import axios from "../../api/axios";

const Loading = lazy(() => import("../../components/Loading"));

function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef();
    const errRef = useRef();

    const [email, resetEmail, useAttr] = useInput('email', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle("persist", false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth',
                JSON.stringify({ email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const id = response?.data?.id;
            setAuth({ email, roles, accessToken, id });
            resetEmail('');
            setPwd('');
            navigate(from, { replace: true })
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <Suspense fallback={<Loading />} >
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </Suspense>
            <img className="mx-auto relative bottom-18" src="/resources/logo.png" alt="" />
            <Animate to="1" from="0" attributeName="opacity" duration={500}>
                <h1 className="uppercase tracking-tight mb-10 text-xl text-zinc-50 font-bold">Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-5">
                    <Input
                        label={"Email:"}
                        id={"username"}
                        type={"text"}
                        turo={userRef}
                        autoCompt={"on"}
                        value={email}
                        inLog={true}
                        attribs={useAttr}
                    />

                    <Input
                        label={"Password:"}
                        id={"password"}
                        type={"password"}
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        inLog={true}
                    />
                    <Button label={"Login"} style={"bg-orange-400 text-zinc-50 w-full"} />
                </form>
                <div className='mb-2 ml-1'>
                    <input
                        type="checkbox"
                        id='persist'
                        onChange={toggleCheck}
                        checked={check}
                        className="accent-green-700"
                    />
                    <label className='ml-1 text-zinc-50 text-xs' htmlFor="persist">Trust this Device</label>
                </div>
                <p className="text-center text-zinc-50 text-xs">Doesn't have an account?
                    <Link to={"/register"}>
                        <span className="text-green-700 ml-1">Sign up</span>
                    </Link>
                </p>
            </Animate>
        </>
    );
}

export default Login;