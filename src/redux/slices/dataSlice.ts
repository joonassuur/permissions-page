import { createSlice } from '@reduxjs/toolkit';
import { roles, permissionsFields } from '../../types/data';
import { toCamelCase } from '../../utils';
import { getPermissionsForInheritedRole } from '../../utils';
import { Role, PermissionsCategory, Permissions } from '../../types/types';

interface DataState {
  roles: Role[];
  permissions: PermissionsCategory[];
}

const initialState: DataState = {
  roles,
  permissions: permissionsFields,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetDataSlice: () => initialState,
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    addRole: (state, action) => {
      const { roleName, roleInherit } = action.payload;
      const newRole: Role = {
        key: toCamelCase(roleName),
        name: roleName,
      };
      const newRoles = [...state.roles, newRole];
      state.roles = newRoles;

      if (roleInherit) {
        const inheritedPermissions = getPermissionsForInheritedRole(
          state.permissions,
          roleInherit
        );
        const newPermissions = state.permissions.map(
          (category: PermissionsCategory) => ({
            ...category,
            permissions: category.permissions.map((permission) => ({
              ...permission,
              approvedRoles: inheritedPermissions.includes(permission.key)
                ? [...permission.approvedRoles, newRole]
                : permission.approvedRoles,
            })),
          })
        );
        state.permissions = newPermissions;
      }
    },
    removeRole: (state, action) => {
      const { role } = action.payload;
      const newRoles = state.roles.filter((r) => r.key !== role.key);
      const newPermissions = state.permissions.map(
        (field: PermissionsCategory) => ({
          ...field,
          permissions: field.permissions.map((perm: Permissions) => ({
            ...perm,
            approvedRoles: perm.approvedRoles.filter(
              (approvedRole) => approvedRole.key !== role.key
            ),
          })),
        })
      );

      state.roles = newRoles;
      state.permissions = newPermissions;
    },
    editRole: (state, action) => {
      const { role } = action.payload;
      const newRoles = roles.map((r: Role) => {
        if (r.key === role.key) {
          return role;
        }
        return r;
      });
      const newPermissions = state.permissions.map(
        (category: PermissionsCategory) => ({
          ...category,
          permissions: category.permissions.map((permission) => ({
            ...permission,
            approvedRoles: permission.approvedRoles.map((r) =>
              r.key === role.key ? role : r
            ),
          })),
        })
      );
      state.roles = newRoles;
      state.permissions = newPermissions;
    },
    changePermission: (state, action) => {
      const { role, permission } = action.payload;
      const newPermissions = state.permissions.map((field) => ({
        ...field,
        permissions: field.permissions.map((perm) => {
          if (perm.key === permission) {
            const updatedApprovedRoles = perm.approvedRoles.some(
              (approvedRole) => approvedRole.key === role.key
            )
              ? perm.approvedRoles.filter(
                  (approvedRole) => approvedRole.key !== role.key
                )
              : [...perm.approvedRoles, role];
            return { ...perm, approvedRoles: updatedApprovedRoles };
          }
          return perm;
        }),
      }));
      state.permissions = newPermissions;
    },
  },
});

export const {
  resetDataSlice,
  setRoles,
  setPermissions,
  removeRole,
  addRole,
  editRole,
  changePermission,
} = dataSlice.actions;
export default dataSlice.reducer;
