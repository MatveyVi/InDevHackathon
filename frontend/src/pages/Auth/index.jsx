import React, { useState } from 'react';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import {Login} from "../../User/Login.jsx";
import {Register} from "../../User/Register.jsx";



export const Auth = () => {
    const [selected, setSelected] = useState('login');

    return (
        <div className="flex justify-center items-center  bg-amber-100">
            <div className="flex flex-col">
                <Card className=" min-w-full w-[390px] h-[444px]">
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
        </div>
    );
};
