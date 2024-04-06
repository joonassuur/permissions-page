import React, { useCallback, useState } from 'react';
import Toggle from './Toggle';
import RoleAddModal from './modals/RoleAddModal';
import RoleEditModal from './modals/RoleEditModal';
import DropdownMenu from './DropdownMenu';
import { LockIcon } from '../assets/icons/LockIcon';
import { PermissionsCategory, PermissionType, Role } from '../types/types';

interface Props {
  addRoleModalOpen: boolean;
  editRoleModalOpen: boolean;
  setAddRoleModalOpen: (open: boolean) => void;
  setEditRoleModalOpen: (open: boolean) => void;
  permissions: PermissionsCategory[];
  roles: Role[];
  setPermissions: (permissions: PermissionsCategory[]) => void;
  setRoles: (roles: Role[]) => void;
  onNewRoleSubmit: ({
    roleName,
    roleInherit,
  }: {
    roleName: string;
    roleInherit: string;
  }) => void;
  onEditRoleSubmit: (role: Role) => void;
}

function PermissionsTable({
  addRoleModalOpen,
  setAddRoleModalOpen,
  permissions,
  setPermissions,
  roles,
  onNewRoleSubmit,
  onEditRoleSubmit,
  setRoles,
  setEditRoleModalOpen,
  editRoleModalOpen,
}: Props) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handlePermissionChange = useCallback(
    (role: Role, permission: PermissionType) => {
      const newPermissions = permissions.map((field) => ({
        ...field,
        permissions: field.permissions.map((perm) => {
          if (perm.key === permission) {
            if (
              perm.approvedRoles.some(
                (approvedRole) => approvedRole.key === role.key
              )
            ) {
              perm.approvedRoles = perm.approvedRoles.filter(
                (approvedRole) => approvedRole.key !== role.key
              );
            } else {
              perm.approvedRoles = [...perm.approvedRoles, role];
            }
          }
          return perm;
        }),
      }));

      setPermissions(newPermissions);
      localStorage.setItem('permissions', JSON.stringify(newPermissions));
    },
    [permissions, setPermissions]
  );

  const handleRoleRemove = useCallback(
    (role: Role) => {
      const newRoles = roles.filter((r) => r.key !== role.key);
      const newPermissions = permissions.map((field) => ({
        ...field,
        permissions: field.permissions.map((perm) => ({
          ...perm,
          approvedRoles: perm.approvedRoles.filter(
            (approvedRole) => approvedRole.key !== role.key
          ),
        })),
      }));

      setPermissions(newPermissions);
      setRoles(newRoles);
      localStorage.setItem('permissions', JSON.stringify(newPermissions));
      localStorage.setItem('roles', JSON.stringify(newRoles));
    },
    [permissions, roles, setPermissions, setRoles]
  );

  return (
    <>
      <RoleAddModal
        open={addRoleModalOpen}
        setOpen={setAddRoleModalOpen}
        onSubmit={onNewRoleSubmit}
        roles={roles}
      />
      <RoleEditModal
        open={editRoleModalOpen}
        setOpen={setEditRoleModalOpen}
        onSubmit={onEditRoleSubmit}
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
                        onClose={() => setDropdownOpen(false)}
                        onOpen={() => {
                          setDropdownOpen(true);
                          setSelectedRole(role);
                        }}
                        onEditClick={() => setEditRoleModalOpen(true)}
                        onRemove={() => handleRoleRemove(role)}
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
                            handlePermissionChange(role, permission.key)
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
