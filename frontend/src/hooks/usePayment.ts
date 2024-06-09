import { useState, useEffect } from "react";

const usePayment = () => {
    type Values = {
        cardNumber?: string;
        cvv?: string;
        expiryDate?: string;
    };
    type Errors = {
        cardNumber?: string;
        cvv?: string;
        expiryDate?: string;
    };

    const initialValues: Values = {
        cardNumber: "",
        cvv: "",
        expiryDate: "",
    };

    //Form values
    const [values, setValues] = useState<Values>(initialValues);
    //Errors
    const [errors, setErrors] = useState<Errors>({});

    const [feedBackMessage, setFeedBackMessage] = useState("");

    useEffect(() => {
        validateForm();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeedBackMessage("");
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });

        validate(name, value, errors);
        if (Object.keys(errors).length === 0) {
            setFeedBackMessage("Looks good!");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): boolean => {
        e.preventDefault();

        validateForm();

        if (Object.keys(errors).length === 0) {
            return true;
        }
        return false;
    };

    const validateForm = () => {
        const newErrors: Errors = {};

        // Validar cada campo del formulario
        Object.entries(values).forEach(([name, value]) => {
            validate(name, value, newErrors);
        });

        setErrors(newErrors);
    };

    const validate = (name: string, value: string, newErrors: Errors) => {
        switch (name) {
            case "cardNumber":
                if (!value) {
                    newErrors.cardNumber = "Card number is required";
                } else if (
                    value.length < 16 ||
                    value.length > 16 ||
                    !value.match(/^[0-9]{16}$/)
                ) {
                    newErrors.cardNumber = "Card number must be 16 digits";
                } else {
                    delete newErrors.cardNumber;
                }
                break;
            case "cvv":
                if (!value) {
                    newErrors.cvv = "CVV is required";
                } else if (
                    value.length < 3 ||
                    value.length > 3 ||
                    !value.match(/^[0-9]{3}$/)
                ) {
                    newErrors.cvv = "CVV must be 3 digits";
                } else {
                    delete newErrors.cvv;
                }
                break;
            case "expiryDate":
                if (!value) {
                    newErrors.expiryDate = "Expiry date is required";
                } else if (value.length !== 5) {
                    newErrors.expiryDate =
                        "Expiry date must be in the format MM/DD";
                } else if (!value.match(/^(0[0-9]|1[0-2])\/\d{2}$/)) {
                    newErrors.expiryDate =
                        "Expiry date must be in the format MM/DD";
                } else {
                    const today = new Date();
                    const currentYear = today
                        .getFullYear()
                        .toString()
                        .substr(-2);
                    const currentMonth = today.getMonth() + 1;
                    const currentDay = today.getDate();
                    const expiryYear = value.substr(3, 2);
                    const expiryMonth = parseInt(value.substr(0, 2));
                    const expiryDay = parseInt(value.substr(3, 2));

                    // Crear una nueva fecha con el año y mes de la fecha de expiración
                    const expiryDateObj = new Date(
                        parseInt(`20${expiryYear}`),
                        expiryMonth - 1,
                        expiryDay
                    );

                    if (
                        expiryYear < currentYear ||
                        (expiryYear === currentYear &&
                            expiryMonth < currentMonth) ||
                        (expiryYear === currentYear &&
                            expiryMonth === currentMonth &&
                            expiryDay < currentDay) ||
                        expiryDateObj.getMonth() + 1 !== expiryMonth ||
                        expiryDateObj.getDate() !== expiryDay
                    ) {
                        newErrors.expiryDate = "Invalid expiry date";
                    } else {
                        delete newErrors.expiryDate;
                    }
                }
                break;

            default:
                break;
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        feedBackMessage,
        setFeedBackMessage
    };
};

export default usePayment;
