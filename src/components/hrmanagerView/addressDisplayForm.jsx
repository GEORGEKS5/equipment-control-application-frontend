import DialogWindow from '../../layouts/dialogWindow';
import FormInput from '../UI/formInput';
import DefaultButton from '../UI/defaultButton';
import AddressCreateForm from '../hrmanagerView/addressCreateForm';
import useAddressModelRepository from '../../hooks/hrmanager/useAddressModelRepository';
import { useState } from 'react';
import FormField from '../../layouts/slots/formField';
import FormFooter from '../../layouts/slots/formFooter';

function AddressDisplayForm({formVisible, activeEmployeeUserName, hideForm}) {
    const [addressEditFormVisible, setAddressEditFormVisible] = useState(false);
    const {addressModel, getAddressRepostiory, setAddressModel} = useAddressModelRepository(formVisible, activeEmployeeUserName, hideForm);

    function hideCurrentForm(){
        hideForm();
        setAddressModel({
            apartmentNumber: '',
            cityName: '',
            houseNumber: '',
            regionName: '',
            streetName: '',
            typeName: '',
        });
    }
    
    function openAddressEditForm(){
        setAddressEditFormVisible(true);
    }
    
    function hideAddressEditForm(){
        setAddressEditFormVisible(false);
    }
    
    function updateAddressRepository(){
        getAddressRepostiory();
        hideAddressEditForm();
    }

    return (
        <>
            <DialogWindow
                visibleForm={formVisible}
                hideForm={hideCurrentForm}>
                    <FormField>
                        <FormInput
                            fieldCaption="Область"
                            displayOnly={true}
                            inputValue={addressModel?.regionName || ""}>
                        </FormInput>
                        <FormInput
                            fieldCaption="Город"
                            displayOnly={true}
                            inputValue={addressModel?.cityName || ""}>
                        </FormInput>
                        <FormInput
                            fieldCaption={addressModel?.typeName || ""}
                            displayOnly={true}
                            inputValue={addressModel?.streetName || ""}>
                        </FormInput>
                        <FormInput
                            fieldCaption="Дом"
                            displayOnly={true}
                            inputValue={addressModel?.houseNumber || ""}>
                        </FormInput>
                        <FormInput
                            fieldCaption="Квартира"
                            displayOnly={true}
                            inputValue={addressModel?.apartmentNumber || ""}>
                        </FormInput>
                    </FormField>
                    <FormFooter>
                        <DefaultButton
                            buttonCaption="Закрыть"
                            buttonClass="form"
                            buttonClick={hideCurrentForm}>
                        </DefaultButton>
                        <DefaultButton
                            buttonCaption="Изменить"
                            buttonClass="formUnactive"
                            buttonClick={openAddressEditForm}>
                        </DefaultButton>
                    </FormFooter>
            </DialogWindow>

            <AddressCreateForm
                formVisible={addressEditFormVisible}
                externalAddressRequestModel={addressModel}
                addressCreateEndPointName="UpdateAddressByUserName"
                activeEmployeeUserName={activeEmployeeUserName}
                hideForm={hideAddressEditForm}
                houseCreated={updateAddressRepository}>
            </AddressCreateForm>
        </>
    )
}

export default AddressDisplayForm;