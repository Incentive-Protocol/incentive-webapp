export default function SearchBar() {
    return (
        <>
            <div className='Flex Center Search'>
                <div className='Flex Center SearchBar' style={{ justifyContent: "space-between" }}>
                    {/* <div className="Flex Center" style={{ gap: "0.4rem" }}> */}
                    {/* <img src='/Search.svg' style={{ height: "1rem", opacity: 0.35 }}></img> */}
                    <input className="SearchInput Small" placeholder="What do you want to eat?"></input>
                    {/* </div> */}
                    <button onClick={() => { }}>
                        <img className="IconMic" src='/Mic.svg'></img>
                    </button>
                </div>
            </div>
        </>
    )
}