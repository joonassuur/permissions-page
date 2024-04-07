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
  {
    key: 'manager',
    name: 'Manager',
  },
  {
    key: 'limitedManager',
    name: 'Limited manager',
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
          {
            key: 'manager',
            name: 'Manager',
          },
          {
            key: 'limitedManager',
            name: 'Limited manager',
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
  {
    key: 'billing',
    title: 'Billing',
    permissions: [
      {
        key: PermissionType.EDIT_BILLING_DETAILS,
        name: 'Edit billing details',
        description: 'View and edit company billing details.',
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
    key: 'screening',
    title: 'Screening',
    permissions: [
      {
        key: PermissionType.ONGOING_MONITORING,
        name: 'Ongoing monitoring',
        description: 'The ability to turn ongoing monitoring on or off.',
        approvedRoles: [
          {
            key: 'admin',
            name: 'Admin',
          },
        ],
      },
      {
        key: PermissionType.ADD_HIT,
        name: 'Add hit',
        description: 'The ability to add and edit hits.',
        approvedRoles: [
          {
            key: 'admin',
            name: 'Admin',
          },
        ],
      },
      {
        key: PermissionType.REMOVE_HIT,
        name: 'Remove hit',
        description: 'The ability to delete hits.',
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
    key: 'questionnaired',
    title: 'Questionnaires and Risk Assessments',
    permissions: [
      {
        key: PermissionType.ADD_FIELD,
        name: 'Add field',
        description:
          'Add and edit fields in the questionnaire and risk assessment builder.',
        approvedRoles: [
          {
            key: 'admin',
            name: 'Admin',
          },
        ],
      },
      {
        key: PermissionType.CUSTOMER_RISK_ASSESSMENT,
        name: 'Customer risk assessment ',
        description: 'The ability to access the risk assessment settings.',
        approvedRoles: [
          {
            key: 'admin',
            name: 'Admin',
          },
        ],
      },
      {
        key: PermissionType.JURISDICTIONAL_RISK_ASSESSMENT,
        name: 'Jurisdictional risk assessment',
        description:
          'The ability to view and edit the jurisdictional risk assessment.',
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
