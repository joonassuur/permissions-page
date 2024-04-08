import { useState } from 'react';
import RoleAddModal from '../components/modals/RoleAddModal';
import RoleEditModal from '../components/modals/RoleEditModal';
import { useAppDispatch } from '../redux/reduxHooks';
import { setSelectedRole } from '../redux/slices/uiSlice';
import { editRole, addRole, removeRole } from '../redux/slices/dataSlice';
import { customToast } from '../utils';
import PageHeader from '../components/PageHeader';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import PermissionsTable from '../components/PermissionsTable';
import { useAppSelector } from '../redux/reduxHooks';
import { Role, AddRolePayload } from '../types/types';

function Permissions() {
  const dispatch = useAppDispatch();
  const selectedRole = useAppSelector((state) => state.ui.selectedRole);
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [deleteRoleModalOpen, setDeleteRoleModalOpen] = useState(false);

  const handleDeleteRole = () => {
    dispatch(removeRole({ role: selectedRole }));
    dispatch(setSelectedRole({ role: null }));
    setDeleteRoleModalOpen(false);
    customToast('Role deleted successfully');
  };

  const handleEditRole = (role: Role) => {
    dispatch(editRole({ role }));
    dispatch(setSelectedRole({ role: null }));
    setEditRoleModalOpen(false);
    customToast('Role edited successfully');
  };

  const handleAddRole = ({ roleName, roleInherit }: AddRolePayload) => {
    dispatch(addRole({ roleName, roleInherit }));
    setAddRoleModalOpen(false);
    customToast('Role added successfully');
  };

  return (
    <>
      <DeleteConfirmModal
        open={deleteRoleModalOpen}
        deleteTitle={selectedRole?.name || ''}
        setOpen={(boolean) => setDeleteRoleModalOpen(boolean)}
        onSubmit={handleDeleteRole}
      />
      <RoleAddModal
        open={addRoleModalOpen}
        setOpen={(boolean) => setAddRoleModalOpen(boolean)}
        onSubmit={handleAddRole}
      />
      {!selectedRole ? null : (
        <RoleEditModal
          open={editRoleModalOpen}
          setOpen={(boolean) => setEditRoleModalOpen(boolean)}
          onSubmit={handleEditRole}
          selectedRole={selectedRole}
        />
      )}
      <PageHeader
        title="Permissions"
        onButtonClick={() => setAddRoleModalOpen(true)}
      />
      <PermissionsTable
        setDeleteRoleModalOpen={setDeleteRoleModalOpen}
        setEditRoleModalOpen={setEditRoleModalOpen}
      />
    </>
  );
}

export default Permissions;
