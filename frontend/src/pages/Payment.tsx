import logo from "../assets/img/logo-64.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.tsx";
import usePayment from "../hooks/usePayment.ts";
import { getLocalStorage } from "../helpers/localstorage.ts";
import { AuthContext } from "../context/AuthContext.tsx";
import ModalPayment from "../components/ModalPayment.tsx";

export default function Payment() {
    const {
        errors,
        handleChange,
        handleSubmit,
        feedBackMessage,
        setFeedBackMessage,
        values,
    } = usePayment();
    const [showError, setShowError] = useState(false);
    const errorMessage = errors.cardNumber || errors.cvv || errors.expiryDate;
    const [serverError, setServerError] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { changeUserType } = useContext(AuthContext);

    const navigate = useNavigate();

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowError(true);
        const isValid = handleSubmit(e);
        isValid && submitPaymentForm();
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServerError("");
        handleChange(e);
    };

    const submitPaymentForm = async () => {
        try {
            const token = getLocalStorage("token");
            if (!token) return;
            setShowSpinner(true);
            const res = await fetch(
                import.meta.env.VITE_SERVER + "/api/payments",
                {
                    method: "POST",
                    body: JSON.stringify({
                        cardNumber: values.cardNumber,
                        cvv: values.cvv,
                        expiry_date: values.expiryDate,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            setShowSpinner(false);
            setFeedBackMessage("");
            if (data.error) {
                setServerError(data.error);
                return;
            } else if (data.message) {
                setFeedBackMessage(data.message);
            }

            setTimeout(() => {
                navigate("/dashboard");
                changeUserType("premium");
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };
    const navigateToMainPage = () => {
        navigate("/dashboard");
    };

    return (
        <>
            <i
                className="fa-regular fa-circle-left text-white text-xl pt-5 ps-5 cursor-pointer"
                onClick={navigateToMainPage}
            ></i>

            <div
                className={`flex justify-center items-center min-h-screen ${
                    showModal && "opacity-40"
                }`}
            >
                <div className="text-white grid place-items-center px-6">
                    <img src={logo} alt="Logo" />
                    <h1 className="text-3xl text-center font-bold py-6 md:py-10 md:pb-6">
                        Online Payment
                    </h1>
                    <button
                        className="flex items-center gap-2 p-1 mb-2 rounded-sm font-bold text-sm"
                        onClick={() => setShowModal(true)}
                    >
                        <span>View Details</span>
                        <i className="fa-solid fa-circle-info text-yellow-200"></i>
                    </button>
                    {errorMessage && showError && (
                        <div className="w-full text-red-400 text-sm text-center p-3 mb-5 mt-3 rounded border border-red-900 bg-red-950">
                            {errorMessage}
                        </div>
                    )}

                    {serverError && (
                        <div className="w-full text-red-400 text-sm text-center mt-3 p-3 mb-5 rounded border border-red-900 bg-red-950">
                            {serverError}
                        </div>
                    )}

                    {feedBackMessage && (
                        <div className="w-full text-green-400 text-sm text-center p-3 mb-5 rounded border border-green-900 bg-green-950">
                            {feedBackMessage}
                        </div>
                    )}

                    <form
                        action=""
                        noValidate
                        onSubmit={submitForm}
                        className="grid grid-cols-12 gap-4 w-full max-w-md"
                    >
                        <div className="col-span-12">
                            <label htmlFor="cardNumber" className="font-bold">
                                Card Number
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="Card Number"
                                className="bg-gray-800 p-2 rounded w-full mt-2"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="expiryDate" className="font-bold">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                placeholder="MM/YY"
                                className="bg-gray-800 p-2 rounded w-full mt-2"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="cvv" className="font-bold">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                placeholder="CVV"
                                className="bg-gray-800 p-2 rounded w-full mt-2"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="col-span-12 flex justify-center p-0 py-2">
                            <button
                                type="submit"
                                className="bg-purple-500 p-2 rounded font-bold w-full"
                            >
                                Proceed
                            </button>
                        </div>
                    </form>
                    <div className="mt-10">{showSpinner && <Spinner />}</div>
                </div>
            </div>
            <ModalPayment showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
