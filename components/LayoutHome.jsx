import NavBar from "../elements/NavBar";

export default function LayoutHome({ children }) {

    return (
        <>
            <div className="Full Flex Column"
                style={{ gap: "1.5rem", paddingBottom: "10rem" }}
            >

                {children}

                <NavBar />

            </div>
        </>
    )
}