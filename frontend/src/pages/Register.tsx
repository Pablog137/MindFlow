import logo from "../assets/img/logo-64.png";
import useForm from "../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.tsx";

export default function Register() {
    const { values, errors, handleChange, handleSubmit } = useForm("register");
    const [showError, setShowError] = useState(false);
    const errorMessage =
        errors.name ||
        errors.email ||
        errors.password ||
        errors.password_confirmation;
    const [serverError, setServerError] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowError(true);
        const isValid = handleSubmit(e);
        isValid && registerAPI();
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServerError("");
        handleChange(e);
    };

    const registerAPI = async () => {
        try {
            setShowSpinner(true);
            const res = await fetch(
                import.meta.env.VITE_SERVER + "/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const data = await res.json();
            setShowSpinner(false);
            if (data.errors) {
                setServerError(data.errors[0]);
                return;
            }
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToMainPage = () => {
        navigate("/");
    };

    return (
        <>
            <i
                className="fa-regular fa-circle-left text-white text-xl pt-5 ps-5 cursor-pointer"
                onClick={navigateToMainPage}
            ></i>

            <div className="flex justify-center items-center min-h-screen">
                <div className="text-white grid place-items-center px-6">
                    <img src={logo} alt="Logo" />
                    <h1 className="text-3xl text-center font-bold py-8 md:p-10">
                        Create an account
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
                        noValidate
                        onSubmit={submitForm}
                        className="grid grid-cols-12 gap-4 w-full max-w-md"
                    >
                        <div className="col-span-12">
                            <label htmlFor="name" className="font-bold">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                className="bg-gray-800 p-2 rounded w-full mt-2"
                                onChange={onChangeInput}
                            />
                        </div>
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
                        <div className="col-span-12">
                            <div className="flex justify-between">
                                <label
                                    htmlFor="password_confirmation"
                                    className="font-bold"
                                >
                                    Repeat password
                                </label>
                            </div>

                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                placeholder="Repeat password"
                                className="bg-gray-800 p-2 rounded w-full mt-2"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="col-span-12 flex justify-center p-0 py-2">
                            <button
                                type="submit"
                                className="bg-purple-500 p-2 rounded font-bold w-full"
                            >
                                Sign up
                            </button>
                        </div>
                        <div className="col-span-12">
                            <p className="text-center font-bold">
                                Already have an account? {""}
                                <a
                                    href="/login"
                                    className="text-purple-300 font-bold"
                                >
                                    Log In
                                </a>
                            </p>
                        </div>
                    </form>
                    <div className="mt-10">{showSpinner && <Spinner />}</div>
                </div>
            </div>
        </>
    );
}
