
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import AddEmployeeDialog from '../AddEmployeeDialog';
import useSWR from 'swr';
import { capitalizeFirstLetter } from '@/utils/functions';
import Image from 'next/image';
import { Avatar } from 'primereact/avatar';
import { BASE_URL } from '@/utils/constant';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { errorMessageClear, successMessageClear } from '@/slices/userSlice';
import UpdateEmployeeDialog from '../UpdateEmployeeDialog';
import { deleteUser, deleteUsers } from '@/actions/userActions';

const Table = () => {

    let emptyUser = {
        _id: '',
        name: '',
        firstname: '',
        lastname: '',
        email: '',
        salary: 0,
        status: '',
        birthDate: '',
    };

    const [userDialog, setUserDialog] = useState(false);
    const [userUpdateDialog, setUserUpdateDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState<Array<any>>([]);
    const [submitted, setSubmitted] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [globalFilter, setGlobalFilter] = useState<any>(null);
    const toast = useRef<any>(null);
    const table = useRef<any>(null);
    const [selectAll, setSelectAll] = useState(false);

    const { data, error, isLoading } = useSWR(`/api/users`)
    const { successMessage, errorMessage } = useAppSelector(state => state.users)

    const dispatch = useAppDispatch();




    const formatCurrency = (value: any) => {

        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }
    const hideUpdateDialog = () => {
        setUpdated(false);
        setUserUpdateDialog(false);
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    }

    // const saveUser = (data: any) => {
    //     setSubmitted(true);

    //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'New Employee Added.', life: 3000 });
    //     setUserDialog(false);
    // }

    const editUser = (data: any) => {
        setUser({ ...data });
        setUserUpdateDialog(true);
    }

    const confirmDeleteUser = (data: any) => {
        setUser({ ...data });
        setDeleteUserDialog(true);
    }

    const deleteTheUser = () => {
        dispatch(deleteUser(user?._id))
        setDeleteUserDialog(false)
    }


    const exportCSV = () => {
        table.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    }

    const deleteSelectedUsers = () => {
        let ids: Array<Object> = [];
        selectedUsers.map(user => ids.push(user?._id));

        dispatch(deleteUsers(ids))
        setDeleteUsersDialog(false)
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="flex gap-2">
                <Button label="Add Emplyoyee" icon="pi pi-user-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />
            </div>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <div className="flex gap-2">
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </div>
        )
    }


    const priceBodyTemplate = (rowData: any) => {
        return formatCurrency(rowData.salary);
    }

    const birthDateBodyTemplate = (rowData: any) => {
        return new Date(rowData.birthDate).toLocaleDateString();
    }

    const statusBodyTemplate = (rowData: any) => {

        return <span className={`product-badge py-1 px-4 text-sm font-semibold bg-slate-500 text-white rounded-full ${rowData.status.toLowerCase() == 'active' ? 'bg-green-500' : 'bg-rose-500'}`}>{rowData.status.toUpperCase()}</span>;
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    }
    const avatarBodyTemplate = (rowData: any) => {
        return (
            <>
                {rowData.avatar ? (
                    <Image src={rowData.avatar} alt={rowData.name} width={10} height={10} />
                ) : (
                    <Avatar label={rowData.name.charAt(0).toUpperCase()} shape='circle' className="p-avatar-circle" />
                )}
            </>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Employee</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteUserDialogFooter = (
        <div className="flex gap-2 justify-end">
            <Button label="No" icon="pi pi-times" className="p-button-success p-button-sm" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-danger p-button-sm" onClick={deleteTheUser} />
        </div>
    );
    const deleteUsersDialogFooter = (
        <div className="flex gap-2 justify-end">
            <Button label="No" icon="pi pi-times" className="p-button-success p-button-sm" onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-danger p-button-sm" onClick={deleteSelectedUsers} />
        </div>
    );

    const onSelectAllChange = (event: any) => {
        const selectAll = event.checked;

        if (selectAll && !isLoading) {
            setSelectAll(true);
            setSelectedUsers(data.users)
        }
        else {
            setSelectAll(false);
            setSelectedUsers([]);
        }
    }

    const onSelectionChange = (event: any) => {
        const value = event.value;
        setSelectedUsers(value);
        setSelectAll(value.length === data.length);
    }

    useEffect(() => {
        if (successMessage) {

            toast.current.show({ severity: 'success', summary: 'Success!', detail: successMessage, life: 3000 });
            dispatch(successMessageClear());
        }
        if (errorMessage) {

            toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            dispatch(errorMessageClear());
        }
    }, [successMessage, errorMessage, dispatch]);


    return (
        <div className="container mx-auto">
            <div className="datatable-crud">
                <Toast ref={toast} />

                <div className="card">
                    <Toolbar className="mb-5 bg-transparent border-0 border-b" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={table}
                        value={data?.users ?? []}
                        selection={selectedUsers}
                        onSelectionChange={onSelectionChange}
                        loading={isLoading}
                        dataKey="_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        header={header}
                        responsiveLayout="scroll"
                        selectAll={selectAll}
                        onSelectAllChange={onSelectAllChange}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column field="avatar" header="Avatar" body={avatarBodyTemplate}></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="salary" header="Salary" body={priceBodyTemplate} sortable></Column>
                        <Column field="birthDate" header="birthDate" body={birthDateBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate} header="Actions" exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>

                <AddEmployeeDialog onShow={userDialog} setUserDialog={setUserDialog} onHide={hideDialog} setSubmitted={setSubmitted} />
                <UpdateEmployeeDialog onShow={userUpdateDialog} setUserUpdateDialog={setUserUpdateDialog} onHide={hideUpdateDialog} setUpdated={setUpdated} user={user} />

                <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {user && <span>Are you sure you want to delete <b>{user.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {user && <span>Are you sure you want to delete the selected products?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default Table;