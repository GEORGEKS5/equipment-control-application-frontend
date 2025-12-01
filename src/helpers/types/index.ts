export type headerRow = headerCell[];
export type buttonSet = button[];
export type formName = string | symbol;

export type headerCell = {
    name: string,
    localName: string,
    filterable?: boolean,
    visible?: boolean,
};

export type button = {
    valueParamName: string,
    emitEventName: string,
    caption: string,
    iconPath?: string,
};

export type DataTable = {
    button: buttonSet,
    header: headerRow,
};

export type TEquipment = {
    SerialNumber: undefined | string
};

export type TEmployee = {
    UserName: undefined | string
}

export type TConstructiveObject = {
    objectIdentificator: undefined | string
}

export type TUserContext = {
    userName: string,
    userRole: string,
    serverProtocol: string,
    serverAddress: string,
    serverPort: string,
    employeeName: string,
    employeeLastName: string,
    appointmentDate: string,
    getServerUrlAddress() : string,
}


