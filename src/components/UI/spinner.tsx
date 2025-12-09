type TSpinnerProps = {
    caption?: string
}
function Spinner({caption}: TSpinnerProps) {
    return (
        <div className="p-[2em] flex flex-col items-center">
            <div className="w-[3.5em] h-[3.5em] p-[1em] border-[0.2em] border-black rounded-full border-dashed animate-spin"></div>
            {
                    caption
                ?
                    <h3 className="mt-[1em] animate-pulse">{caption}</h3>
                :
                    <></>
            }
        </div>
    )
}

export default Spinner;