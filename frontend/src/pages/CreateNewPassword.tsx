import { useEffect, useState } from "react";
import logo from "../assets/img/logo-64.png";
import { PASSWORD_MIN_LENGTH } from "../common/utils/constants";
import Spinner from "../components/Spinner";

export default function CreateNewPassword() {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({
        message: "",
        type: "",
    });
    const [showMessage, setShowMessage] = useState(false);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);
        const email = urlParams.get("email");
        if (email) setEmail(email);
    }, []);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password.trim().length < PASSWORD_MIN_LENGTH) {
            setMessage({
                message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
                type: "error",
            });
            setShowMessage(true);
            return;
        }
        apiRequest();
    };

    const apiRequest = async () => {
        setIsLoading(true);
        const url = "/api/resetPassword";
        fetch(`${import.meta.env.VITE_SERVER + url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.type === "success") {
                    setPassword("");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 2000);
                }
                setMessage({
                    message: data.message,
                    type: data.type,
                });
                setShowMessage(true);
                setIsLoading(false);
            });
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowMessage(false);
        setPassword(e.target.value);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-white grid place-items-center px-6">
                <img src={logo} alt="Logo" />
                <h1 className="text-3xl text-center font-bold py-8 md:p-10">
                    Create new password
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
                <form
                    action=""
                    onSubmit={submitForm}
                    className="grid grid-cols-12 gap-4 w-full max-w-md "
                    noValidate
                >
                    <div className="col-span-12">
                        <label htmlFor="password" className="font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="bg-gray-800 p-2 rounded w-full mt-2"
                            onChange={onChangeInput}
                            autoComplete="off"
                        />
                    </div>

                    <div className="col-span-12 flex justify-center p-0 py-2">
                        <button
                            type="submit"
                            className="bg-purple-500 p-2 rounded font-bold w-full"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="mt-10">{isLoading && <Spinner />}</div>
            </div>
        </div>
    );
}
