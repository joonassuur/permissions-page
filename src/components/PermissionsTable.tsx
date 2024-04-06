import React, { useState } from 'react';
import Toggle from './Toggle';
import RoleAddModal from './modals/RoleAddModal';
import RoleEditModal from './modals/RoleEditModal';
import { useAppDispatch } from '../redux/reduxHooks';
import {
  removeRole,
  editRole,
  addRole,
  changePermission,
} from '../redux/slices/dataSlice';
import {
  setEditRoleModalOpen,
  setAddRoleModalOpen,
  setSelectedRole,
} from '../redux/slices/uiSlice';
import DropdownMenu from './DropdownMenu';
import { LockIcon } from '../assets/icons/LockIcon';
import { useAppSelector } from '../redux/reduxHooks';
import { Role, PermissionsCategory } from '../types/types';

function PermissionsTable() {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const addRoleModalOpen = useAppSelector((state) => state.ui.addRoleModalOpen);
  const selectedRole = useAppSelector((state) => state.ui.selectedRole);
  const editRoleModalOpen = useAppSelector(
    (state) => state.ui.editRoleModalOpen
  );
  const roles: Role[] = useAppSelector((state) => state.data.roles);
  const permissions: PermissionsCategory[] = useAppSelector(
    (state) => state.data.permissions
  );

  const handleDropdownOpen = (role: Role) => {
    setDropdownOpen(true);
    dispatch(setSelectedRole(role));
  };
  const handleDropdownClose = () => {
    setDropdownOpen(false);
    dispatch(setSelectedRole(null));
  };

  return (
    <>
      <RoleAddModal
        open={addRoleModalOpen}
        setOpen={(boolean) => dispatch(setAddRoleModalOpen(boolean))}
        onSubmit={({
          roleName,
          roleInherit,
        }: {
          roleName: string;
          roleInherit: string;
        }) => {
          dispatch(setAddRoleModalOpen(false));
          dispatch(addRole({ roleName, roleInherit }));
        }}
        roles={roles}
      />
      <RoleEditModal
        open={editRoleModalOpen}
        setOpen={(boolean) => dispatch(setEditRoleModalOpen(boolean))}
        onSubmit={(role: Role) => {
          dispatch(editRole({ role }));
          dispatch(setEditRoleModalOpen(false));
        }}
        selectedRole={selectedRole}
      />
      <div className="relative overflow-x-auto rounded-lg mt-8">
        <table className="border border-border w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="bg-black-4 text-secondary text-md font-normal">
            <tr>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              {roles.map((role) => (
                <th
                  key={role.key}
                  scope="col"
                  className="align-middle px-6 py-3 text-center border-l border-border"
                >
                  <div className="flex align-middle items-center justify-center">
                    <span>{role.name}</span>
                    {role.key === 'admin' ? (
                      <LockIcon />
                    ) : (
                      <DropdownMenu
                        open={isDropdownOpen && selectedRole?.key === role.key}
                        onClose={handleDropdownClose}
                        onOpen={() => handleDropdownOpen(role)}
                        onEditClick={() => dispatch(setEditRoleModalOpen(true))}
                        onRemove={() => dispatch(removeRole({ role }))}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((field) => (
              <React.Fragment key={field.key}>
                <tr className="border-t border-border">
                  <td className="px-6 pt-3 text-md text-secondary border-l border-border">
                    {field.title}
                  </td>
                  {roles.map((role) => (
                    <th
                      key={role.key}
                      scope="col"
                      className="px-6 py-3 text-center border-l border-border"
                    />
                  ))}
                </tr>
                {field.permissions.map((permission) => (
                  <tr key={permission.key}>
                    <td className="px-6 py-3 border-l border-border">
                      <div className="text-primary text-md">
                        {permission.name}
                      </div>
                      <div className="text-gray-400 text-secondary text-sm">
                        {permission.description}
                      </div>
                    </td>
                    {roles.map((role) => (
                      <td
                        key={role.key}
                        className="px-6 py-3 text-center border-l border-border"
                      >
                        <Toggle
                          checked={permission.approvedRoles.some(
                            (approvedRole) => approvedRole.key === role.key
                          )}
                          handleChange={() =>
                            dispatch(
                              changePermission({
                                role,
                                permission: permission.key,
                              })
                            )
                          }
                          disabled={role.key === 'admin'}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PermissionsTable;
