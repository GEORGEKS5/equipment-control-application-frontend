import { useContext } from 'react';
import ConfirmForm from '../confirmForm';
import UserContext from '../../context/user';
import getRequestPromise from '../../helpers/lib';

console.log('from HOC');

function EmployeeDismissConfirm({formVisible, activeEmployeeUserName, hideForm, employeeDissmissed}) {
    const {USER_STATE} = useContext(UserContext);
    
    function dismissEmployee(){
        const servAdr = USER_STATE.getServerUrlAddress();
        const endPoint = 'DismissEmployee';
        const reqBody = {'UserName': activeEmployeeUserName};
        const prom = getRequestPromise(servAdr, endPoint, reqBody);

        console.log('from dissmissEmployee function');

        prom.then(p=>{
            console.log(p);
            employeeDissmissed();
        });
    }

    return (
        <ConfirmForm
            formVisible={formVisible}
            formCaption="Уволить сотрудника?"
            hideForm={hideForm}
            taskConfirmed={dismissEmployee}
            taskCanceled={hideForm}>
        </ConfirmForm>
    )
}

export default EmployeeDismissConfirm;