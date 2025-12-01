import { useState, useEffect } from "react"

export default function(employeeInitialRepository: never[], directorInitialRepository: never[], hrManagerInitialRepository: never[]){
    const [filteredEmployeeModel, setFilteredEmployeeModel] = useState([]);
    const [filteredDirectorModel, setFilteredDirectorModel] = useState([]);
    const [filteredHrManagerModel, setFilteredHrManagerModel] = useState([]);

    useEffect(() => {
        setFilteredEmployeeModel(employeeInitialRepository);
    }, [employeeInitialRepository]);

    useEffect(() => {
        setFilteredDirectorModel(directorInitialRepository);
    }, [directorInitialRepository]);

    useEffect(() => {
        setFilteredHrManagerModel(hrManagerInitialRepository);
    }, [hrManagerInitialRepository]);

    return{
        filteredEmployeeModel,
        filteredDirectorModel,
        filteredHrManagerModel,
    }
}