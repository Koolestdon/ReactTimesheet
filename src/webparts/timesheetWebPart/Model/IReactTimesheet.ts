import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

export interface IReactTimesheet {
    selectedItems: any[];
    date: Date;
    hours: string;
    description: string;
    dpselectedItem?: { key: string | number | undefined };
    dpselectedItems: IDropdownOption[];
    disableToggle: boolean;
    defaultChecked: boolean;
    hideDialog: boolean;
    status: string;
    showPanel: boolean;
    required: string;
    onSubmission: boolean;
}

export interface ISPLists {
    value: ISPList[];
}

export interface ISPList {
    Title: string;
    Id: string;
    Description: string;
    Category: string;
    Date: Date;
    Hours: number;
}