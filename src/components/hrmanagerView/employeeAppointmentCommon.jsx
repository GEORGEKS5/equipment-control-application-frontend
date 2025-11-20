import DialogWindow from '../../layouts/dialogWindow';
import FormField from '../../layouts/slots/formField';
import FormFooter from '../../layouts/slots/formFooter';
import FormSelectBlock from '../UI/formSelectBlock';
import DefaultButton from '../UI/defaultButton';
import useEmployeeAppointRepository from '../../hooks/useEmployeeAppointRepository';
import useMarkEmployeeAppointRepository from '../../hooks/useMarkEmployeeAppointmentRepository';
import useAppointRequestModel from '../../hooks/useAppointRequestModel';
import getRequestPromise from '../../helpers/lib';
import getFullDate from '../../helpers/getFullDate';
import { useContext, useMemo, useState } from 'react';
import UserContext from '../../context/user';

function EmployeeAppointmentCommon({formVisible = false, employeeId = '', reAppointEmployee = {}, requestEndPointName = '', hideForm, employeeAppointed}) {
    const [selectPlaceholder] = useState({
        departmentName: 'Отдел',
        positionName: 'Должность',
    });

    const {USER_STATE} = useContext(UserContext);

    const defaultAppointmentRequestModel = {
        department: {
            Id: '',
            Name: '',
        },
        position: {
            Id: '',
            Name: '',
        },
    };

    const [appointmentRequestModel, setAppointmentRequestModel] = useState(defaultAppointmentRequestModel);

    const {departmentRepository, positionRepository, getPositionRepo, getDepartmentRepo, setDepartmentRepository, setPositionRepository} = useEmployeeAppointRepository();
    const {appointPositionObject, appointDepartmentObject} = useMarkEmployeeAppointRepository(departmentRepository, positionRepository, reAppointEmployee, appointmentRequestModel);
    useAppointRequestModel(formVisible, getDepartmentRepo, getPositionRepo, positionRepository, appointDepartmentObject, appointPositionObject, appointmentRequestModel, departmentRepository, setAppointmentRequestModel, setDepartmentRepository, setPositionRepository);

    const departmentBind = useMemo(()=>{
        return {
            DepartmentID: appointmentRequestModel.department.Id, 
        }
    }, [appointmentRequestModel.department.Id]);

    function updateDepartmentPropList(val){
        setAppointmentRequestModel(v=>{
            return {...v, department: {Id: v.department.Id, Name: val}}
        });

        getDepartmentRepo().then(() => {
            const model = departmentRepository.find(v => {
                return v['DepartmentName'] == val
            });

            setAppointmentRequestModel(v=>{
                return {...v, department: {...v.department, Id: model['DepartmentID']}}
            });
        });
    }

    function updatePositionPropList(val){
        setAppointmentRequestModel(v=>{
            return {...v, position: {...v.position, Id: val}}
        });

        getPositionRepo().then(r => {
            const model = positionRepository.find(v => {
                console.log(val);
                return v['PositionID'] == val
            });

            setAppointmentRequestModel(v=>{
                return {...v, position: {...v.position, Name: model['PositionName']}}
            });
        });
    }

    function setDepartmentRequestModel(val){
        setAppointmentRequestModel(v=>{
            return {...v, department: {Id: Boolean(val.DepartmentID) ? +val.DepartmentID : val.DepartmentID, Name: val.DepartmentName}}
        });
    }

    function setPositionRequestModel(val){
        setAppointmentRequestModel(v=>{
            return {...v, position: {Id: Boolean(val.PositionID) ? +val.PositionID : val.PositionID, Name: val.PositionName}}
        });
    }

    function requestEmployeeAppointment(){
        const servUrlAdr = USER_STATE.getServerUrlAddress();

        const requestModel = {
            UserName: employeeId,
            PositionID: +appointmentRequestModel.position.Id,
            DepartmentID: +appointmentRequestModel.department.Id,
            AppointmentDate: getFullDate(),
            HRUserName: USER_STATE.userName,
        };

        const requestPromise = getRequestPromise(servUrlAdr, requestEndPointName, requestModel);

        requestPromise.then((res) => {
            const responseOk = res.ok;
            
            if(responseOk){
                employeeAppointed();
            }
        })
    }


    return (
        <DialogWindow
            visibleForm={formVisible}
            hideForm={hideForm}>
                <FormField>
                    <FormSelectBlock
                        fieldCaption="Отдел"
                        selectBlockData={departmentRepository}
                        selectPlaceholder={selectPlaceholder.departmentName}
                        selectBlockValue={appointmentRequestModel.department.Name}
                        identificatorKeyName="DepartmentID"
                        valueKeyName="DepartmentName"
                        targetModelName="Department"
                        updateSelect={setDepartmentRequestModel}
                        sendPropInsert={updateDepartmentPropList}
                        sendPropUpdate={updateDepartmentPropList}>
                    </FormSelectBlock>
                    <FormSelectBlock
                        fieldCaption="Должность"
                        selectBlockData={positionRepository}
                        selectPlaceholder={selectPlaceholder.positionName}
                        selectBlockValue={appointmentRequestModel.position.Name}
                        identificatorKeyName="PositionID"
                        valueKeyName="PositionName"
                        targetModelName="Position"
                        targetPropModelName="SinglePosition"
                        selectPropDataUrlAddress="GetSinglePosition"
                        extraRequestData={departmentBind}
                        updateSelect={setPositionRequestModel}
                        sendPropInsert={updatePositionPropList}
                        sendPropUpdate={updatePositionPropList}>
                    </FormSelectBlock>
                </FormField>
                <FormFooter>
                    <DefaultButton
                        buttonCaption="Назначить"
                        buttonClass="form"
                        buttonClick={requestEmployeeAppointment}>
                    </DefaultButton>
                </FormFooter>
        </DialogWindow>
    )
}

export default EmployeeAppointmentCommon;