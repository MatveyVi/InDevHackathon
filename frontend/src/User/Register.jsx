import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Link } from '@heroui/react';
import {Input} from "../Components/Input/Input.jsx";

export const Register = ({ setSelected }) => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });




    return (
        <form className="flex flex-col gap-4">

            <Input
                control={control}
                name="name"
                label="Имя"
                type="text"
                required="Обязательное поле"
            />
            <Input
                control={control}
                name="email"
                label="Email"
                type="email"
                required="Обязательное поле"
            />
            <Input
                control={control}
                name="password"
                label="Пароль"
                type="password"
                required="Обязательное поле"
            />

            <p className="text-center text-small">
                Уже есть аккаунт?{" "}
                <Link
                    size="md"
                    className="cursor-pointer"
                    onPress={() => setSelected('login')}
                >
                    Войдите
                </Link>
            </p>

            <div className="flex gap-2 justify-end mt-7">
                <Button fullWidth color="primary" type="submit">
                    Зарегистрироваться
                </Button>
            </div>


        </form>
    );
};
