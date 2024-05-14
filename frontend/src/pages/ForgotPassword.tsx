import { useState } from "react";
import logo from "../assets/img/logo-64.png";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({
        message: "",
        type: "",
    });
    const [showMessage, setShowMessage] = useState(false);
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
        apiRequest();

        console.log(message.message);
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowMessage(false);
        setEmail(e.target.value);
    };

    const apiRequest = async () => {
        fetch("http://localhost:8000/api/sendPasswordRecoveryEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMessage({
                    message: data.message,
                    type: data.type,
                });
                setShowMessage(true);
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
                            type="submit"
                            className="bg-purple-500 p-2 rounded font-bold w-full"
                        >
                            Reset password
                        </button>
                    </div>
                </form>
                {/* <div className="mt-10">{showSpinner && <Spinner />}</div> */}
            </div>
        </div>
    );
}
