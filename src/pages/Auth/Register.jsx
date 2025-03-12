import Button from "../../components/Button";
import { Link, useNavigate } from 'react-router-dom'
import Animate from "react-smooth";
import { useRef, useState, useEffect } from "react";
import Input from "../../components/Input";
import axios from "../../api/axios";

const EMAIL_REGEX = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.[a-zA-Z0-9_'^&/+-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NUMBER_REGEX = /^\d{4}-?\d{3}-?\d{4}$/;

function Register() {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()

    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [number, setNumber] = useState('');
    const [validNumber, setValidNumber] = useState(false);
    const [numberFocus, setNumberFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidNumber(NUMBER_REGEX.test(number));
    }, [number])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleRegister = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = NUMBER_REGEX.test(number);
        const v3 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }   

        try {
            const response = await axios.post('/register',
                JSON.stringify({ user, pwd, number, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response.data))
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate("/")
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Duplicate Datas Detected');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="w-full">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <img className="mx-auto relative bottom-18" src="/resources/logo.png" alt="" />
            <Animate to="1" from="0" attributeName="opacity" duration={500}>
                <form onSubmit={handleRegister} className="flex flex-col gap-2 relative bottom-24">
                    <h1 className="uppercase tracking-tight mb-4 text-xl text-zinc-50 font-bold">Register</h1>
                    <Input
                        label={"Fullname:"}
                        classcont={user}
                        turo={userRef}
                        name={"fullname"}
                        type={"text"}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        autocompt={"off"}
                        onblur={() => setUserFocus(false)}
                        onfocus={() => setUserFocus(true)}
                        focus={userFocus}
                        note={"usernote"}
                        desc={'Must be a valid name. Example: Juan Dela Cruz'}
                    />

                    <Input
                        label={"Mobile Number:"}
                        classcont={validNumber}
                        name={"number"}
                        type={"number"}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        autocompt={"off"}
                        onblur={() => setNumberFocus(false)}
                        onfocus={() => setNumberFocus(true)}
                        focus={numberFocus}
                        note={"numbernote"}
                        desc={'Must be a valid mobile number. Example: 09123456789'}
                    />

                    <Input
                        label={"Email:"}
                        classcont={validEmail}
                        name={"email"}
                        type={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autocompt={"off"}
                        onblur={() => setEmailFocus(false)}
                        onfocus={() => setEmailFocus(true)}
                        focus={emailFocus}
                        note={"emailnote"}
                        desc={'Must be a valid email address. Example: JuanDelaCruz123@gmail.com"'}
                    />

                    <Input
                        label={"Password:"}
                        classcont={validPwd}
                        name={"password"}
                        type={"password"}
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onblur={() => setPwdFocus(false)}
                        onfocus={() => setPwdFocus(true)}
                        focus={pwdFocus}
                        note={"pwdnote"}
                        desc={"Must be 8 to 24 Characters. Must not have special symbols."}
                    />

                    <Input
                        label={"Confirm Password:"}
                        classcont={validMatch && matchPwd}
                        name={"confirm_pwd"}
                        type={"password"}
                        value={matchPwd}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        onblur={() => setMatchFocus(false)}
                        onfocus={() => setMatchFocus(true)}
                        focus={matchFocus}
                        note={"confirmnote"}
                        desc={"Must match the first password input field."}
                    />

                    <Button label={"Register"} style={"bg-orange-400 text-zinc-50 w-full mt-7 disabled:bg-orange-800 disabled:text-zinc-400 duration-300"} disabled={!user || !validEmail || !validPwd || !validMatch ? true : false} />
                    <p className="text-center text-zinc-50 text-xs mt-2">Have an account?
                        <Link to={"/"}>
                            <span className="text-green-700 ml-1">Log in</span>
                        </Link>
                    </p>
                </form>
            </Animate >
        </div>

    )
}

export default Register;    