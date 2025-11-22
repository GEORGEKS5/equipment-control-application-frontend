import EmployeeCommon from '../../components/hrmanagerView/employeeCommon';

function RegisteredEmployeeEdit(props) {
    return(
        <EmployeeCommon
            {...props}
            employeeRegistEndPointName="updateRegisteredEmployee"
            userNameFieldDisplayOnly={true}>
        </EmployeeCommon>
    )
}

export default RegisteredEmployeeEdit;