import React, { useState } from 'react';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { Login } from '../../User/Login.jsx';
import { Register } from '../../User/Register.jsx';

export const Auth = () => {
    const [selected, setSelected] = useState('login');

    return (
        <div className="flex justify-center items-center min-h-screen bg-sky-950">
            <Card className="w-[390px] h-[444px] shadow-lg rounded-2xl">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(String(key))}
                    >
                        <Tab key="login" title="Вход">
                            <Login setSelected={setSelected} />
                        </Tab>
                        <Tab key="sign-up" title="Регистрация">
                            <Register setSelected={setSelected} />
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
};
