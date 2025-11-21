import EmployeeAppointmentCommon from '../hrmanagerView/employeeAppointmentCommon';

function EmployeeReAppointment({formVisible = false, reAppointEmployee = { UserName: '',}, ...props}) {
    return (
        <EmployeeAppointmentCommon
            {...props}
            formVisible={formVisible}
            employeeId={reAppointEmployee.UserName}
            reAppointEmployee={reAppointEmployee}
            requestEndPointName="AppointEmployee">
        </EmployeeAppointmentCommon>
    )
}

export default EmployeeReAppointment;