import { Role, PermissionsCategory, PermissionType } from './types';

const roles: Role[] = [
  {
    key: 'admin',
    name: 'Admin',
  },
  {
    key: 'member',
    name: 'Member',
  },
];

const permissionsFields: PermissionsCategory[] = [
  {
    key: 'general',
    title: 'General',
    permissions: [
      {
        key: PermissionType.ADD_CLIENT,
        name: 'Add client',
        description: 'The ability to add and edit clients.',
        approvedRoles: [
          {
            key: 'admin',
            name: 'Admin',
          },
        ],
      },
      {
        key: PermissionType.DELETE_CLIENT,
        name: 'Delete client',
        description: 'The ability to delete clients.',
        approvedRoles: [
          {
            key: 'admin',
            name: 'Admin',
          },
        ],
      },
      {
        key: PermissionType.ADD_INVOLVEMENT,
        name: 'Add involvement',
        description: 'The ability to add, edit and delete involvements.',
        approvedRoles: [
          {
            key: 'admin',
            name: 'Admin',
          },
        ],
      },
    ],
  },
  {
    key: 'teamMemberAccess',
    title: 'Team member access',
    permissions: [
      {
        key: PermissionType.ACCESS_ROLE,
        name: 'Set permissions and access role',
        description:
          'The ability to update permissions and change access roles.',
        approvedRoles: [
          {
            key: 'admin',
            name: 'Admin',
          },
        ],
      },
    ],
  },
];

export { roles, permissionsFields };
