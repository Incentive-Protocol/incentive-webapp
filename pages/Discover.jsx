import LayoutHome from "../components/LayoutHome"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TransitionElement } from "../components/TransitionElement";
import SearchBar from "../elements/SearchBar";

export default function Discover() {

    const filters = ["FOOD", "POKE", "PIZZA", "SUSHI", "PASTA", "MEXICAN", "DRINK"];
    const [selectedFilter, setSelectedFilter] = useState(filters[0]);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="Full Flex"
                style={{ height: "8.5rem", padding: "3rem 3rem 0", justifyContent: "space-between", alignItems: "center" }}>

                {!isOpen && (
                    <div className="Flex Flex Column" style={{ alignItems: "flex-start", gap: "1rem" }}>
                        <TransitionElement>
                            <p className="Bold SubTitle"> Discover </p>
                        </TransitionElement>

                        <div className="Full Flex" style={{ alignItems: "center", gap: "0.2rem" }}>
                            <img src="/Location.svg" style={{ height: "1.5rem" }}></img>
                            <p className="Thin Mid"> Milan </p>
                        </div>
                    </div>
                )}

                {isOpen && (
                    <TransitionElement>
                        <SearchBar />
                    </TransitionElement>
                )}

                <div className="Flex Center IconEdit"
                    onClick={() => setIsOpen(!isOpen)}>
                    <img src="/Search.svg" style={{ height: "2rem" }}></img>
                </div>
            </div>

            <div className="Flex Container">
                <nav>
                    <ul className="Flex Center Filters" style={{ gap: "1rem", padding: "0 3rem" }}>
                        {filters.map((item) => (
                            <li
                                key={item}
                                className={item == selectedFilter ? "Flex Center Mid Filter selected" : "Flex Center Mid Filter"}
                                onClick={() => setSelectedFilter(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="Flex Center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedFilter ? selectedFilter : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="Full Flex Column Feed" style={{ gap: "3rem" }}>
                            <img className="Full imgTry" src="/Mexican.jpg"></img>
                            <img className="Full imgTry" src="/Pasta.jpg"></img>
                            <img className="Full imgTry" src="/Poke.jpg"></img>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}

Discover.getLayout = function getLayout(page) {
    return (
        <LayoutHome>{page}</LayoutHome>
    )
}