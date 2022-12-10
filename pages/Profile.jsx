import LayoutHome from "../components/LayoutHome"
import { TransitionElement } from '../components/TransitionElement';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Profile() {

    const tabs = ["Active now", "Recent"];
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    return (
        <>
            <div className="Full Flex Column"
                style={{ padding: "3rem 3rem 0", alignItems: "flex-start", gap: "1rem" }}>

                <div className="Full Flex Center" style={{ justifyContent: "space-between", marginBottom: "0.6rem" }}>
                    <img src="/Amanda.jpg" style={{ height: "6.5rem", borderRadius: "50%", border: "0.1rem solid var(--orange)" }}></img>

                    <div className="Flex" style={{ gap: "2rem" }}> {/* padding: "1.5rem 2rem", */}
                        <div className="Flex Center Column">
                            <p className="Bold Small"> 540 </p>
                            <p className="Thin Small"> Followers </p>
                        </div>
                        <div className="Flex Center Column">
                            <p className="Bold Small"> 23 </p>
                            <p className="Thin Small"> Following </p>
                        </div>
                    </div>
                </div>

                <div className="Full Flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <TransitionElement>
                        <div className="Flex Column" style={{ alignItems: "flex-start", gap: "1rem" }}>
                            <p className="Bold Big"> Amanda Lee </p>
                            <p className="Thin Mid"> Actress & model. <br></br> Certified personal trainer. </p>
                        </div>
                    </TransitionElement>
                    <div className="Flex Center IconEdit">
                        <img src="/Edit.svg" style={{ height: "2rem" }}></img>
                    </div>
                </div>

                <div className="Full Underline" style={{ margin: "0.8rem 0" }}></div>

                <div className="Full Flex" style={{ alignItems: "center", gap: "0.4rem" }}>
                    <img src="/Balance.svg" style={{ height: "1.5rem" }}></img>
                    <p className="Thin Mid"> Incentive saved you: <span className="Bold"> $20 </span></p>
                </div>
            </div>

            <div className="Flex Column TabWindow" style={{ padding: "0 3rem" }}>
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
                <div className="Flex Column" style={{ width: "100%" }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTab ? selectedTab : "empty"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {selectedTab == tabs[0] ? (

                                <div className="Full Flex Column" style={{ gap: "1rem" }} >

                                    <div className="Full Flex Inc IncNow" style={{ padding: "1rem", alignItems: "center", justifyContent: "flex-start", gap: "1rem" }}>
                                        <img className="IncImg" src="/Pizza.jpg"></img>
                                        <div className="Full Flex Column">
                                            <p className="Small"> Pizza Margherita </p>
                                            <p className="Bold Small"> Pizzeria Apollo </p>
                                        </div>
                                    </div>

                                    <div className="Full Flex Inc IncNow" style={{ padding: "1rem", alignItems: "center", justifyContent: "flex-start", gap: "1rem" }}>
                                        <img className="IncImg" src="/Pizza2.jpg"></img>
                                        <div className="Full Flex Column">
                                            <p className="Small"> Pizza Quattro Stagioni </p>
                                            <p className="Bold Small"> Pizzeria Apollo </p>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className="Full Flex Column" style={{ gap: "1rem" }} >

                                    {/* finita prima fase, sistema code-clone */}

                                    <div className="Full Flex Inc" style={{ padding: "1rem", alignItems: "center", justifyContent: "flex-start", gap: "1rem" }}>
                                        <img className="IncImg" src="/Poke.jpg"></img>
                                        <div className="Full Flex Column">
                                            <p className="Small"> Salmon Poke </p>
                                            <p className="Bold Small"> I Love Poke </p>
                                        </div>
                                    </div>

                                    <div className="Full Flex Inc" style={{ padding: "1rem", alignItems: "center", justifyContent: "flex-start", gap: "1rem" }}>
                                        <img className="IncImg" src="/Pizza.jpg"></img>
                                        <div className="Full Flex Column">
                                            <p className="Small"> Pizza Margherita </p>
                                            <p className="Bold Small"> Pizzeria Apollo </p>
                                        </div>
                                    </div>

                                    <div className="Full Flex Inc" style={{ padding: "1rem", alignItems: "center", justifyContent: "flex-start", gap: "1rem" }}>
                                        <img className="IncImg" src="/Mexican.jpg"></img>
                                        <div className="Full Flex Column">
                                            <p className="Small"> Tacos </p>
                                            <p className="Bold Small"> 100 Montaditos </p>
                                        </div>
                                    </div>

                                    <div className="Full Flex Inc" style={{ padding: "1rem", alignItems: "center", justifyContent: "flex-start", gap: "1rem" }}>
                                        <img className="IncImg" src="/Pasta.jpg"></img>
                                        <div className="Full Flex Column">
                                            <p className="Small"> Carbonara </p>
                                            <p className="Bold Small"> Quinto Quarto </p>
                                        </div>
                                    </div>

                                    <div className="Full Flex Inc" style={{ padding: "1rem", alignItems: "center", justifyContent: "flex-start", gap: "1rem" }}>
                                        <img className="IncImg" src="/Pizza2.jpg"></img>
                                        <div className="Full Flex Column">
                                            <p className="Small"> Pizza Quattro Stagioni </p>
                                            <p className="Bold Small"> Pizzeria Apollo </p>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>

            { /* 
            <div className="Flex Container">
                <div className="Flex" style={{ gap: "1.5rem", padding: "0 3rem" }} >

                    <div className="Flex Column Incentivo" style={{ alignItems: "flex-start", justifyContent: "flex-end", backgroundImage: "url(/Poke.jpg)", backgroundPosition: "50% 50%", backgroundSize: "cover" }}>
                        <div className="Flex Column IncentivoFoot" style={{ width: "100%", height: "40%", padding: "0 0 0 0.8rem", alignItems: "flex-start", justifyContent: "center", background: "var(--grey)", borderRadius: "0 0 1.5rem 1.5rem" }}>
                            <p className="Small"> Salmon Poke </p>
                            <p className="Bold Small"> I Love Poke </p>
                        </div>
                    </div>

                    <div className="Flex Column Incentivo" style={{ alignItems: "flex-start", justifyContent: "flex-end", backgroundImage: "url(/Pasta.jpg)", backgroundPosition: "50% 50%", backgroundSize: "cover" }}>
                        <div className="Flex Column IncentivoFoot" style={{ width: "100%", height: "40%", padding: "0 0 0 0.8rem", alignItems: "flex-start", justifyContent: "center", background: "var(--grey)", borderRadius: "0 0 1.5rem 1.5rem" }}>
                            <p className="Small"> Carbonara </p>
                            <p className="Bold Small"> Quinto Quarto </p>
                        </div>
                    </div>

                    <div className="Flex Column Incentivo" style={{ alignItems: "flex-start", justifyContent: "flex-end", backgroundImage: "url(/Pizza.jpg)", backgroundPosition: "50% 50%", backgroundSize: "cover" }}>
                        <div className="Flex Column IncentivoFoot" style={{ width: "100%", height: "40%", padding: "0 0 0 0.8rem", alignItems: "flex-start", justifyContent: "center", background: "var(--grey)", borderRadius: "0 0 1.5rem 1.5rem" }}>
                            <p className="Small"> Pizza Salsiccia </p>
                            <p className="Bold Small"> Pizzeria Apollo </p>
                        </div>
                    </div>
                </div>
            </div>
            */ }
        </>
    )
}

Profile.getLayout = function getLayout(page) {
    return (
        <LayoutHome>{page}</LayoutHome>
    )
}

