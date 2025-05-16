import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Link } from '@heroui/react';
import { redirect, useNavigate } from 'react-router-dom';
import {Input} from "../Components/Input/Input.jsx";
import { login } from '../api/auth-api.js';
import { getAvailableRooms } from '../api/hotel-api.js';



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
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            await login(data.phone, data.password)
            console.log('logined')
            navigate('/booking')
        } catch (error) {
            alert('Неверные данные')
        }
    }



    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                control={control}
                name="phone"
                label="Телефон"
                type="text"
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
