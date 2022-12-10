import Link from "next/link";
import LayoutEntry from '../components/LayoutEntry';
import { TransitionStart } from "../components/TransitionStart";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../elements/Button";
import InputStart from "../elements/InputStart";

export default function Register() {

    const tabs = ["User", "Business"];
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    return (
        <>
            <TransitionStart>
                <div className="Flex Column TabWindow">
                    <nav className="TabsNav">
                        <ul className="Full Flex Small">
                            {tabs.map((item) => (
                                <li
                                    key={item}
                                    className={item == selectedTab ? "TabsLi selected" : "TabsLi"}
                                    onClick={() => setSelectedTab(item)}
                                >
                                    {item}
                                    {item == selectedTab ? (
                                        <motion.div className="tabUnderline" layoutId="tabUnderline" />
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="Flex Center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab ? selectedTab : "empty"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {selectedTab == tabs[0] ? (
                                    <div className="Flex Column Center" style={{ gap: "2rem" }}>
                                        <div className="Flex Center Column Inputs">
                                            <InputStart obj="Name" />
                                            <InputStart obj="@username" />
                                            <InputStart obj="Email" />
                                            {/* <InputStart obj="Password" /> */}
                                        </div>

                                        <Link href="/Home" className="Link">
                                            <Button obj="Register" />
                                        </Link>

                                        <p className="Thin Small"> Already of us?
                                            <Link href="/Login" className="Link">
                                                <span className="Bold Action"> <u>Login</u></span>
                                            </Link>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="Flex Column Center" style={{ gap: "2rem", paddingBottom: "5rem" }}>
                                        <div className="Flex Center Column Inputs">
                                            <InputStart obj="Restaurant Name" />
                                            <InputStart obj="@username" />
                                            <InputStart obj="Email" />
                                            {/* <InputStart obj="Password" /> */}
                                        </div>

                                        <Link href="/Discover" className="Link">
                                            <Button obj="Register" />
                                        </Link>

                                        <p className="Thin Small"> Already of us?
                                            <Link href="/Login" className="Link">
                                                <span className="Bold Action"> <u>Login</u></span>
                                            </Link>
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                    </div>
                </div>
            </TransitionStart>
        </>
    )
}

Register.getLayout = function getLayout(page) {
    return (
        <LayoutEntry>{page}</LayoutEntry>
    )
}