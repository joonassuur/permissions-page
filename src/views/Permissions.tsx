import { useState } from 'react';
import RoleAddModal from '../components/modals/RoleAddModal';
import RoleEditModal from '../components/modals/RoleEditModal';
import { useAppDispatch } from '../redux/reduxHooks';
import { editRole, addRole } from '../redux/slices/dataSlice';
import PageHeader from '../components/PageHeader';
import PermissionsTable from '../components/PermissionsTable';
import { useAppSelector } from '../redux/reduxHooks';
import { Role, AddRolePayload } from '../types/types';

function Permissions() {
  const dispatch = useAppDispatch();
  const selectedRole = useAppSelector((state) => state.ui.selectedRole);
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);

  return (
    <>
      <RoleAddModal
        open={addRoleModalOpen}
        setOpen={(boolean) => setAddRoleModalOpen(boolean)}
        onSubmit={({ roleName, roleInherit }: AddRolePayload) => {
          setAddRoleModalOpen(false);
          dispatch(addRole({ roleName, roleInherit }));
        }}
      />
      <RoleEditModal
        open={editRoleModalOpen}
        setOpen={(boolean) => setEditRoleModalOpen(boolean)}
        onSubmit={(role: Role) => {
          dispatch(editRole({ role }));
          setEditRoleModalOpen(false);
        }}
        selectedRole={selectedRole}
      />
      <PageHeader
        title="Permissions"
        onButtonClick={() => setAddRoleModalOpen(true)}
      />
      <PermissionsTable setEditRoleModalOpen={setEditRoleModalOpen} />
    </>
  );
}

export default Permissions;
