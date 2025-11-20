import EmployeeAppointmentCommon from "./employeeAppointmentCommon";

function EmployeeAppointment(props) {
    return (
        <EmployeeAppointmentCommon
            {...props}
            requestEndPointName="AppointEmployee">
        </EmployeeAppointmentCommon>
    )
}

export default EmployeeAppointment;