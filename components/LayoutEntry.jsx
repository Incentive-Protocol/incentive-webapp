export default function LayoutEntry({ children }) {
    return (
        <>
            <div className="Full Flex Center Column Start">

                <img className="Blob Up" src="/Blob.svg"></img>

                <div className="Flex Column Center">
                    <p className="Thin Big"> Welcome to </p>
                    <p className="Bold Title"> Incentive </p>
                </div>

                {children}

            </div>
        </>
    )
}