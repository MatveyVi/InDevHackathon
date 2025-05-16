import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Link } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import {Input} from "../Components/Input/Input.jsx";



export const Login = ({ setSelected }) => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        }
    });




    return (
        <form className="flex flex-col gap-4" >
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
                Нет аккаунта?{" "}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected('sign-up')}
                >
                    Зарегистрируйтесь
                </Link>
            </p>
            <div className="flex gap-2 justify-end mt-7">
                <Button fullWidth color="primary" type="submit" >
                    Войти
                </Button>
            </div>
        </form>
    );
};
