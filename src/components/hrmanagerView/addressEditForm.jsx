import AddressCreateForm from '../../components/hrmanagerView/addressCreateForm';
import useAddressModelRepository from '../../hooks/hrmanager/useAddressModelRepository';

function AddressEditForm({formVisible, activeEmployeeUserName, hideForm}) {
    const {addressModel, hideAddressForm, addressModelLoaded} = useAddressModelRepository(formVisible, activeEmployeeUserName, hideForm);

    return (
        <AddressCreateForm
            formVisible={addressModelLoaded}
            externalAddressRequestModel={addressModel}
            addressCreateEndPointName="UpdateAddressByUserName"
            activeEmployeeUserName={activeEmployeeUserName}
            hideForm={hideAddressForm}
            houseCreated={hideAddressForm}>
        </AddressCreateForm>
    )
}

export default AddressEditForm;