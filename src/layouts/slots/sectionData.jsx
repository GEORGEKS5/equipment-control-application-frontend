import Spinner from "../../components/UI/spinner";

function SectionData({children, data, spinnerCaption}){
    return (
        <>
            {
                    !data || Object.keys(data).length
                ?
                    <>{children}</>
                :
                    <Spinner caption={spinnerCaption}/>
            }
        </>
    )
}

export default SectionData;