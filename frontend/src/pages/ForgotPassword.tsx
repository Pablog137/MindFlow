import { useEffect, useState } from "react";
import logo from "../assets/img/logo-64.png";
import Spinner from "../components/Spinner";
import { createCookie, getCookie } from "../helpers/localstorage";

const getPasswordResetAttempts = () => {
    return getCookie("emailCount") ? parseInt(getCookie("emailCount")) : 0;
};

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({
        message: "",
        type: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [passwordResetAttempts, setPasswordResetAttempts] = useState<number>(
        getPasswordResetAttempts()
    );

    useEffect(() => {
        const passwordResetAttempts = getPasswordResetAttempts();
        setPasswordResetAttempts(passwordResetAttempts);
        if (passwordResetAttempts >= 2) {
            setIsButtonDisabled(true);
            setShowMessage(true);
            setMessage({
                message:
                    "You have exceeded the number of password reset attempts for today.",
                type: "error",
            });
        }
    }, []);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.trim().length === 0) {
            setMessage({
                message: `Email is required`,
                type: "error",
            });
            setShowMessage(true);
            return;
        } else if (
            !email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            setMessage({
                message: `Email is invalid`,
                type: "error",
            });
            setShowMessage(true);
            return;
        }
        setIsButtonDisabled(true);
        apiRequest();
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 8000);
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowMessage(false);
        setEmail(e.target.value);
    };

    const apiRequest = async () => {
        setShowMessage(false);
        setIsLoading(true);
        createCookie("emailCount", (passwordResetAttempts + 1).toString(), 1);
        setPasswordResetAttempts(passwordResetAttempts + 1);
        const url = "/api/sendPasswordRecoveryEmail";
        fetch(`${import.meta.env.VITE_SERVER + url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage({
                    message: data.message,
                    type: data.type,
                });
                setShowMessage(true);
                setIsLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-white grid place-items-center px-6">
                <img src={logo} alt="Logo" />
                <h1 className="text-3xl text-center font-bold py-8 md:p-10">
                    Reset your password
                </h1>
                {message && showMessage && (
                    <div
                        className={`
                    w-full  text-sm text-center p-3 mb-5 rounded border ${
                        message.type === "success"
                            ? "text-green-400 border-green-900 bg-green-950"
                            : "text-red-400 border-red-900 bg-red-950"
                    } 
                    `}
                    >
                        {message.message}
                    </div>
                )}
                {passwordResetAttempts < 2 ? (
                    <form
                        action=""
                        onSubmit={submitForm}
                        className="grid grid-cols-12 gap-4 w-full max-w-md "
                        noValidate
                    >
                        <div className="col-span-12">
                            <label htmlFor="email" className="font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="bg-gray-800 p-2 rounded w-full mt-2"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="col-span-12 flex justify-center p-0 py-2">
                            <button
                                disabled={isLoading || isButtonDisabled}
                                type="submit"
                                className="bg-purple-500 p-2 rounded font-bold w-full"
                            >
                                Reset password
                            </button>
                        </div>
                    </form>
                ) : (
                    <a
                        href="/login"
                        className="text-purple-300 text-xs font-bold"
                    >
                        Back to Log In
                    </a>
                )}

                <div className="mt-10">{isLoading && <Spinner />}</div>
            </div>
        </div>
    );
}
