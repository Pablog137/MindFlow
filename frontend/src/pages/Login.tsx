import logo from "../assets/img/logo-64.png";
import useForm from "../hooks/useForm";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../helpers/localstorage.ts";
import Spinner from "../components/Spinner.tsx";
import { AuthContext } from "../context/AuthContext.tsx";

export default function Login() {
    const { values, errors, handleChange, handleSubmit } = useForm("login");
    const [showError, setShowError] = useState(false);
    const errorMessage = errors.email || errors.password;
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowError(true);
        const isValid = handleSubmit(e);
        isValid && loginAPI();
    };

    const loginAPI = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(
                import.meta.env.VITE_SERVER + "/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const data = await res.json();
            setIsLoading(false);
            if (data.message) {
                setServerError(data.message);
                return;
            }
            setLocalStorage("token", data.token);
            setLocalStorage("user", JSON.stringify(data.user));
            login();
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServerError("");
        handleChange(e);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-white grid place-items-center px-6">
                <img src={logo} alt="Logo" />
                <h1 className="text-3xl text-center font-bold py-8 md:p-10">
                    Log in to your account
                </h1>
                {errorMessage && showError && (
                    <div className="w-full text-red-400 text-sm text-center p-3 mb-5 rounded border border-red-900 bg-red-950">
                        {errorMessage}
                    </div>
                )}

                {serverError && (
                    <div className="w-full text-red-400 text-sm text-center p-3 mb-5 rounded border border-red-900 bg-red-950">
                        {serverError}
                    </div>
                )}

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
                    <div className="col-span-12">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="font-bold">
                                Password
                            </label>
                            <span className="">
                                <a
                                    href="/forgotPassword"
                                    className="text-purple-300 text-xs font-bold"
                                >
                                    Forgot password?
                                </a>
                            </span>
                        </div>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="bg-gray-800 p-2 rounded w-full mt-2"
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className="col-span-12 flex justify-center p-0 py-2">
                        <button
                            type="submit"
                            className="bg-purple-500 p-2 rounded font-bold w-full"
                        >
                            Log in
                        </button>
                    </div>
                    <div className="col-span-12">
                        <p className="text-center font-bold">
                            Don’t have an account? {""}
                            <a
                                href="/register"
                                className="text-purple-300 font-bold"
                            >
                                Create an account
                            </a>
                        </p>
                    </div>
                </form>
                <div className="mt-10">{isLoading && <Spinner />}</div>
            </div>
        </div>
    );
}
