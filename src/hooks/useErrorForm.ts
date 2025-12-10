import { useState } from "react";

export default function (){
    const [errorFormVisible, setErrorFormVisible] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');

    function showErrorFormWithDescription(errorFormDescription: string) {
        setErrorDescription(()=>{
            setErrorFormVisible(true);

            return errorFormDescription;
        })
    }

    function hideErrorForm() {
        setErrorDescription(()=>{
            setErrorFormVisible(false);

            return '';
        })
    }

    return {
        errorFormVisible,
        errorDescription,
        showErrorFormWithDescription,
        hideErrorForm
    }
}