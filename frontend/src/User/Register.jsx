import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Link } from '@heroui/react';
import {Input} from "../Components/Input/Input.jsx";
import { register } from '../api/auth-api.js';

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

    const onSubmit = async (data) => {
        try {
          await register(data.phone, data.name, data.password);
          console.log('register')
          setSelected('login');
          alert('Регистрация прошла успешно, войдите в аккаунт');
        } catch (error) {
          alert(error.response?.data?.error || 'Ошибка регистрации');
        }
      };


    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

            <Input
                control={control}
                name="name"
                label="Имя"
                type="text"
                required="Обязательное поле"
            />
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
