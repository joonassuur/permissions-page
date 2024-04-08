import React, { useState, useMemo } from 'react';
import Toggle from './formElements/Toggle';
import { useAppDispatch } from '../redux/reduxHooks';
import { changePermission } from '../redux/slices/dataSlice';
import { setSelectedRole } from '../redux/slices/uiSlice';
import { LockIcon } from '../assets/icons/LockIcon';
import { useAppSelector } from '../redux/reduxHooks';
import Tooltip from './Tooltip';
import DropdownMenuContainer from './dropdownMenu/DropdownMenuContainer';
import PermissionsDropdownMenuList from './dropdownMenu/PermissionsDropdownMenuList';
import { Role, PermissionsCategory } from '../types/types';

interface Props {
  setEditRoleModalOpen: (open: boolean) => void;
  setDeleteRoleModalOpen: (open: boolean) => void;
}

function PermissionsTable({
  setEditRoleModalOpen,
  setDeleteRoleModalOpen,
}: Props) {
  const dispatch = useAppDispatch();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
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
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const scrollX = document.documentElement.scrollLeft;
    const scrollY = document.documentElement.scrollTop;
    setX(e.clientX + scrollX);
    setY(e.clientY + scrollY);
  };

  const permissionFields = useMemo(() => {
    return permissions.map((field) => (
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
              <div className="text-primary text-md">{permission.name}</div>
              <div className="text-gray-400 text-secondary text-sm">
                {permission.description}
              </div>
            </td>
            {roles.map((role) => (
              <td
                key={role.key}
                className="px-6 py-3 text-center border-l border-border"
              >
                <div
                  onMouseEnter={() => {
                    if (role.key === 'admin') {
                      setShowTooltip(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (showTooltip) {
                      setShowTooltip(false);
                    }
                  }}
                  onMouseMove={handleMouseMove}
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
                </div>
              </td>
            ))}
          </tr>
        ))}
      </React.Fragment>
    ));
  }, [dispatch, permissions, roles, showTooltip]);

  return (
    <>
      {showTooltip && (
        <Tooltip text="Admin permissons are not editable" x={x} y={y} />
      )}
      <div className="relative overflow-x-auto rounded-lg mt-8">
        <table className="min-w-max border border-border w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="bg-black-4 text-secondary text-md font-normal">
            <tr>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              {roles.map((role) => (
                <th
                  key={role.key}
                  scope="col"
                  className="align-middle px-6 py-3 text-center border-l border-border w-10"
                >
                  <div
                    className="flex align-middle items-center justify-center"
                    onMouseMove={handleMouseMove}
                  >
                    <span
                      className="truncate cursor-default"
                      title={role.name}
                      style={{ maxWidth: '80px' }}
                    >
                      {role.name}
                    </span>
                    {role.key === 'admin' ? (
                      <div
                        className="ml-3"
                        onMouseOver={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      >
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
                          onRemove={() => setDeleteRoleModalOpen(true)}
                        />
                      </DropdownMenuContainer>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{permissionFields}</tbody>
        </table>
      </div>
    </>
  );
}

export default PermissionsTable;
