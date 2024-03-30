import { useState, useEffect } from "react";

type FormType = "login" | "register";

const useForm = (formType: FormType) => {
    type Values = {
        email?: string;
        password?: string;
        name?: string;
        password_confirmation?: string;
    };
    type Errors = {
        email?: string;
        password?: string;
        name?: string;
        password_confirmation?: string;
    };

    const initialValues: Values =
        formType === "login"
            ? { email: "", password: "" }
            : { email: "", password: "", name: "", password_confirmation: "" };

    //Form values
    const [values, setValues] = useState<Values>(initialValues);
    //Errors
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        validateForm();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });

        // Validar el campo cada vez que cambie
        validate(name, value, errors);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar todos los campos antes de enviar el formulario
        validateForm();

        // Solo enviar el formulario si no hay errores
        if (Object.keys(errors).length === 0) {
            console.log("Formulario válido");
            console.log(values);
            // Aquí puedes enviar el formulario
        } else {
            console.log("Formulario inválido");
            console.log(errors);
        }
    };

    const validateForm = () => {
        const newErrors: Errors = {};

        // Validar cada campo del formulario
        Object.entries(values).forEach(([name, value]) => {
            validate(name, value, newErrors);
        });

        setErrors(newErrors);
    };

    const validateLogin = (name: string, value: string, newErrors: Errors) => {
        switch (name) {
            case "email":
                if (!value.trim()) {
                    newErrors.email = "Email is required";
                } else if (
                    !value.match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
                ) {
                    newErrors.email = "Email is invalid";
                } else {
                    delete newErrors.email;
                }
                break;

            case "password":
                if (!value.trim()) {
                    newErrors.password = "Password is required";
                } else if (value.length < 6) {
                    newErrors.password =
                        "Password must be at least 6 characters";
                } else {
                    delete newErrors.password;
                }
                break;
        }
    };

    const validateRegister = (
        name: string,
        value: string,
        newErrors: Errors
    ) => {
        switch (name) {
            case "email":
                if (!value.trim()) {
                    newErrors.email = "Email is required";
                } else if (
                    !value.match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
                ) {
                    newErrors.email = "Email is invalid";
                } else {
                    delete newErrors.email;
                }
                break;
            case "name":
                if (!value.trim()) {
                    newErrors.name = "Name is required";
                } else if (value.length < 3) {
                    newErrors.name = "Name must be at least 3 characters";
                } else {
                    delete newErrors.name;
                }
                break;
            case "password":
                if (!value.trim()) {
                    newErrors.password = "Password is required";
                } else if (value.length < 6) {
                    newErrors.password =
                        "Password must be at least 6 characters";
                } else {
                    delete newErrors.password;
                }
                break;
            case "password_confirmation":
                if (!value.trim()) {
                    newErrors.password_confirmation =
                        "Password confirmation is required";
                } else if (value !== values.password) {
                    newErrors.password_confirmation = "Passwords do not match";
                } else {
                    delete newErrors.password_confirmation;
                }
                break;
        }
    };

    const validate = (name: string, value: string, newErrors: Errors) => {
        if (formType === "login") {
            validateLogin(name, value, newErrors);
        } else {
            validateRegister(name, value, newErrors);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
