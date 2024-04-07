import React, { useState } from 'react';
import Toggle from './formElements/Toggle';
import { useAppDispatch } from '../redux/reduxHooks';
import { removeRole, changePermission } from '../redux/slices/dataSlice';
import { setSelectedRole } from '../redux/slices/uiSlice';
import { LockIcon } from '../assets/icons/LockIcon';
import { useAppSelector } from '../redux/reduxHooks';
import DropdownMenuContainer from './dropdownMenu/DropdownMenuContainer';
import PermissionsDropdownMenuList from './dropdownMenu/PermissionsDropdownMenuList';
import { Role, PermissionsCategory } from '../types/types';

interface Props {
  setEditRoleModalOpen: (open: boolean) => void;
}

function PermissionsTable({ setEditRoleModalOpen }: Props) {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const selectedRole = useAppSelector((state) => state.ui.selectedRole);
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
                    <div className="ml-3">
                      <LockIcon />
                    </div>
                  ) : (
                    <DropdownMenuContainer
                      open={isDropdownOpen && selectedRole?.key === role.key}
                      onClose={handleDropdownClose}
                      onOpen={() => handleDropdownOpen(role)}
                    >
                      <PermissionsDropdownMenuList
                        onEditClick={() => setEditRoleModalOpen(true)}
                        onRemove={() => dispatch(removeRole({ role }))}
                      />
                    </DropdownMenuContainer>
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
                <tr key={permission.key} className="hover:bg-black-3">
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
  );
}

export default PermissionsTable;
