import Link from 'next/link';
import { useState } from 'react';

import LayoutEntry from '../components/LayoutEntry';
import { TransitionStart } from '../components/TransitionStart';

import Button from "../elements/Button";
import InputStart from "../elements/InputStart";

export default function Login() {

    return (
        <>
            <TransitionStart>

                <div className="Flex Center Column Inputs">
                    <InputStart obj="Email" />
                    {/* <InputStart obj="Password" /> */}
                </div>

                <Link href="/Home" className="Link">
                    <Button obj="Login User" />
                </Link>
                <Link href="/CreateIncentive" className="Link">
                    <Button obj="Login Business" />
                </Link>

                <div className='Flex Column Center' style={{ gap: "1.2rem" }}>
                    <p className="Thin Small"> New here?
                        <Link href="/Register" className="Link">
                            <span className="Bold Action"> <u>Register</u></span>
                        </Link>
                    </p>
                    {/* Help page da creare */}
                    <p className="Thin Small"> Having trouble?
                        <Link href="/" className="Link">
                            <span className="Bold Action"> <u>Help</u></span>
                        </Link>
                    </p>
                </div>
            </TransitionStart>
        </>
    )
}

Login.getLayout = function getLayout(page) {
    return (
        <LayoutEntry>{page}</LayoutEntry>
    )
}