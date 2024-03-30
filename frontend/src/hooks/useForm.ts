import { useState } from "react";

const useForm = () => {
    type Values = {
        email?: string;
        password?: string;
    };
    type Errors = {
        email?: string;
        password?: string;
    };

    //Form values
    const [values, setValues] = useState<Values>({});
    //Errors
    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });

        // Validar el campo cada vez que cambie
        validate(name, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar todos los campos antes de enviar el formulario
        Object.entries(values).forEach(([name, value]) => {
            validate(name, value);
        });

        // Solo enviar el formulario si no hay errores
        if (Object.keys(errors).length === 0) {
            console.log(values);
            // Aquí puedes enviar el formulario
        } else {
            console.log("Formulario inválido");
        }
    };

    const validate = (name: string, value: string) => {
        const newErrors = { ...errors };

        switch (name) {
            case "email":
                if (!value) {
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
                if (!value) {
                    newErrors.password = "Password is required";
                } else if (value.length < 6) {
                    newErrors.password =
                        "Password must be at least 6 characters";
                } else {
                    delete newErrors.password;
                }
                break;
        }

        setErrors(newErrors);
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
