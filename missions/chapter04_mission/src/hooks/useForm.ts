import { useState } from "react";

interface UseFormProps<T> {
    initialValue: T;
    validations: Record<keyof T, (value: T[keyof T]) => string | null>;
}

function useForm<T>({initialValue, validations}: UseFormProps<T>) {         
    const [formData, setFormData] = useState<T>(initialValue);
    const [errors, setErrors] = useState<Partial<T>>({});
    const [values :T, setValue]


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log(formData);
    };
}