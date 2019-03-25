import Realm from 'realm';

//Hold realm instances
var localRealm;

const ClientData = {
    name: 'ClientData',
    properties: {
        Employees: 'Employee[]',
        LCFs: 'LCF[]',
        SuppPayCodes: 'SuppPayCode[]'
    }
};

const SuppPayCode = {
    name: 'SuppPayCode',
    primaryKey: 'PaycodeId',
    properties: {
        PaycodeId: 'string',
        PayCodeDesc: 'string',
        AmountType: 'string',
        TotalDigits: 'int',
        DecimalDigits: 'int',
        MinAmount: 'double?',
        MaxAmount: 'double?'
    }
};

const LCF = {
    name: 'LCF',
    primaryKey: 'Id',
    properties: {
        Id: 'string',
        Label: 'string',
        LCFValues: 'LCFValue[]'
    }
};

const LCFValue = {
    name: 'LCFValue',
    primaryKey: 'Id',
    properties: {
        Id: 'string',
        Label: 'string'
    }
};

const HomeLCF = {
    name: 'HomeLCF',
    primaryKey: 'BadgeLCFId',
    properties: {
        BadgeLCFId: 'string', //uniqueness
        LCFId: 'string',
        LCFLabel: 'string',
        LCFValueId: 'string',
        IsRequired: 'bool',
        ValidationRequired: 'bool',
        ShowToEmployee: 'bool'
    }
};

//Schema for Realm Tables
const Employee = {
    name: 'Employee',
    primaryKey: 'Badge',
    properties: {
        Badge: 'string',
        EmployeeID: 'string?',
        FirstName: 'string',
        LastName: 'string',
        IsSupervisor: 'bool',
        SupervisorBadge: 'string',
        ReportsToEmpID: 'string?',
        ShowLunchOut: { type: 'bool', default: false },
        ShowTransfer: { type: 'bool', default: false },
        HasEmail: { type: 'bool', default: false },
        HomeLCFs: 'HomeLCF[]',
        FPData: 'FPData[]',
    }
};

const FPData = {
    name: 'FPData',
    primaryKey: 'FPBadge',
    properties: {
        FPBadge: 'string',
        Data: 'string',
        Format: 'string',
        Finger: 'string?',
        Position: {
            type: 'linkingObjects',
            objectType: 'Employee',
            property: 'FPData'
        },
        PostDetails: 'FPDataPostDetail'
    }
};

const FPDataPostDetail = {
    name: 'FPDataPostDetail',
    primaryKey: 'FPBadge',
    properties: {
        FPBadge: 'string',
        Status: 'string',
        Badge: 'string',
        Data: 'string',
        Finger: 'string',
        EnrolledOn: 'date',
        Action: 'string?',
        FPData: {
            type: 'linkingObjects',
            objectType: 'FPData',
            property: 'PostDetails'
        }
    }
};

const Database = {

    init: () => {
        localRealm = new Realm({
            schema: [
                ClientData,
                LCF,
                LCFValue,
                SuppPayCode,
                HomeLCF,
                Employee,
                FPData,
                FPDataPostDetail
            ]
        });
    },

    getRealm: () => {
        return localRealm;
    },

}

export default Database;