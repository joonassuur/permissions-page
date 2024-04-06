import { useState, useEffect, useCallback } from 'react';
import NavMenu from './components/NavMenu';
import PageHeader from './components/PageHeader';
import PermissionsTable from './components/PermissionsTable';
import Chevron from './assets/icons/Chevron';
import { getPermissionsForInheritedRole } from './utils';
import { PermissionsCategory, Role } from './types/types';
import { roles, permissionsFields } from './types/data';
import { toCamelCase } from './utils';
import './App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = useState(false);
  const [permissions, setPermissions] = useState<PermissionsCategory[]>(
    JSON.parse(localStorage.getItem('permissions') || '[]')
  );
  const [tableRoles, setTableRoles] = useState<Role[]>(
    JSON.parse(localStorage.getItem('roles') || '[]')
  );

  useEffect(() => {
    if (!localStorage.getItem('permissions')) {
      localStorage.setItem('permissions', JSON.stringify(permissionsFields));
      setPermissions(permissionsFields);
    }
    if (!localStorage.getItem('roles')) {
      localStorage.setItem('roles', JSON.stringify(roles));
      setTableRoles(roles);
    }
  }, []);

  const handleNewRoleSubmit = useCallback(
    ({ roleName, roleInherit }: { roleName: string; roleInherit: string }) => {
      const newRole: Role = {
        key: toCamelCase(roleName),
        name: roleName,
      };
      const newRoles = [...tableRoles, newRole];
      localStorage.setItem('roles', JSON.stringify(newRoles));
      setTableRoles(newRoles);

      if (roleInherit) {
        const inheritedPermissions = getPermissionsForInheritedRole(
          permissions,
          roleInherit
        );
        const newPermissions = permissions.map((category) => ({
          ...category,
          permissions: category.permissions.map((permission) => ({
            ...permission,
            approvedRoles: inheritedPermissions.includes(permission.key)
              ? [...permission.approvedRoles, newRole]
              : permission.approvedRoles,
          })),
        }));
        localStorage.setItem('permissions', JSON.stringify(newPermissions));
        setPermissions(newPermissions);
      }
      setAddRoleModalOpen(false);
    },
    [permissions, tableRoles]
  );

  const handleEditRoleSubmit = useCallback(
    (role: Role) => {
      const newRoles = tableRoles.map((r) => {
        if (r.key === role.key) {
          return role;
        }
        return r;
      });

      localStorage.setItem('roles', JSON.stringify(newRoles));
      const newPermissions = permissions.map((category) => ({
        ...category,
        permissions: category.permissions.map((permission) => ({
          ...permission,
          approvedRoles: permission.approvedRoles.map((r) =>
            r.key === role.key ? role : r
          ),
        })),
      }));
      localStorage.setItem('permissions', JSON.stringify(newPermissions));
      setPermissions(newPermissions);

      setTableRoles(newRoles);
      setEditRoleModalOpen(false);
    },
    [tableRoles, permissions]
  );

  return (
    <div className="w-screen dark">
      {/* sidebar toggle button */}
      {!showSidebar && (
        <div className="fixed my-auto inset-y-0 align-middle content-center">
          <button onClick={() => setShowSidebar(true)} className="ml-2">
            <Chevron />
          </button>
        </div>
      )}
      {/* sidebar */}
      <NavMenu showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {/* content */}
      <div className={`px-12 ${showSidebar ? 'sm:ml-64' : 'ml-0'} py-8`}>
        <PageHeader
          title="Permissions"
          onButtonClick={() => setAddRoleModalOpen(true)}
        />
        <PermissionsTable
          permissions={permissions}
          roles={tableRoles}
          setPermissions={setPermissions}
          addRoleModalOpen={addRoleModalOpen}
          setAddRoleModalOpen={setAddRoleModalOpen}
          onNewRoleSubmit={handleNewRoleSubmit}
          setRoles={setTableRoles}
          editRoleModalOpen={editRoleModalOpen}
          setEditRoleModalOpen={setEditRoleModalOpen}
          onEditRoleSubmit={handleEditRoleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
