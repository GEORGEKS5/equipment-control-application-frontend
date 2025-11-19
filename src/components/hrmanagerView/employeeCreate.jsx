import { useState } from "react";
import EmployeeCommon from '../hrmanagerView/employeeCommon'
import AddressCreateForm from '../hrmanagerView/addressCreateForm';
import FormButtonBlock from '../UI/formButtonBlock';
import DefaultSlot from "../../layouts/slots/defaultSlot";

function EmployeeCreate({formVisible, hideForm, employeeRegistred}) {
    const [addressCreateFormVisible, setAddressCreateFormVisible] = useState(false);
    const [houseRequestModel, setHouseRequestModel] = useState({});
    
    function clearHouseRequestModel() {
        setHouseRequestModel({
            regionName: '',
            cityName: '',
            typeName: '',
            streetName: '',
            houseNumber: 0,
            houseId: 0,
            apartmentNumber: 0,
        });
    }

    function showAddressCreateForm(){
        setAddressCreateFormVisible(true);
    }

    function hideAddressCreateForm(){
        setAddressCreateFormVisible(false);
    }

    function setHouseModel(houseModel){
        hideAddressCreateForm();
        setHouseRequestModel(()=>{
            return {...houseModel};
        });
    }

    return (
        <>
            <EmployeeCommon
                formVisible={formVisible}
                employeeRegistEndPointName="RegistEmployee"
                houseRequestModel={houseRequestModel}
                userNameFieldDisplayOnly={false}
                hideForm={hideForm}
                employeeRegistred={() => {employeeRegistred()}}
                clearHouseRequestModel={clearHouseRequestModel}>
                    <DefaultSlot>
                        <FormButtonBlock
                            fieldCaption="Адрес"
                            buttonCaption="Выбрать"
                            buttonClick={showAddressCreateForm}>
                        </FormButtonBlock>
                    </DefaultSlot>
            </EmployeeCommon>

            <AddressCreateForm
                formVisible={addressCreateFormVisible}
                externalAddressRequestModel={houseRequestModel}
                addressCreateEndPointName="InsertHouse"
                hideForm={hideAddressCreateForm}
                houseCreated={setHouseModel}>
            </AddressCreateForm>
        </>
    )   
}

export default EmployeeCreate;