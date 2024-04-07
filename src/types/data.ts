// default data
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

const approvedRoles: Record<PermissionType, Role[]> = Object.keys(
  PermissionType
).reduce((acc, permissionTypeKey) => {
  const permissionType = PermissionType[permissionTypeKey as PermissionType];

  switch (permissionType) {
    case PermissionType.ADD_CLIENT:
      acc[permissionType] = [
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
        {
          key: 'member',
          name: 'Member',
        },
      ];
      break;
    case PermissionType.DELETE_CLIENT:
      acc[permissionType] = [
        {
          key: 'admin',
          name: 'Admin',
        },
      ];
      break;
    case PermissionType.ADD_INVOLVEMENT:
      acc[permissionType] = [
        {
          key: 'admin',
          name: 'Admin',
        },
      ];
      break;
    case PermissionType.ACCESS_ROLE:
      acc[permissionType] = [
        {
          key: 'admin',
          name: 'Admin',
        },
        {
          key: 'manager',
          name: 'Manager',
        },
      ];
      break;
    case PermissionType.EDIT_BILLING_DETAILS:
      acc[permissionType] = [
        {
          key: 'admin',
          name: 'Admin',
        },
      ];
      break;
    case PermissionType.ONGOING_MONITORING:
      acc[permissionType] = [
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
      ];
      break;
    case PermissionType.ADD_HIT:
      acc[permissionType] = [
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
      ];
      break;
    case PermissionType.REMOVE_HIT:
      acc[permissionType] = [
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
      ];
      break;
    case PermissionType.ADD_FIELD:
      acc[permissionType] = [
        {
          key: 'admin',
          name: 'Admin',
        },
      ];
      break;
    case PermissionType.CUSTOMER_RISK_ASSESSMENT:
      acc[permissionType] = [
        {
          key: 'admin',
          name: 'Admin',
        },
      ];
      break;
    case PermissionType.JURISDICTIONAL_RISK_ASSESSMENT:
      acc[permissionType] = [
        {
          key: 'admin',
          name: 'Admin',
        },
      ];
      break;
    default:
      break;
  }
  return acc;
}, {} as Record<PermissionType, Role[]>);

const permissionsFields: PermissionsCategory[] = [
  {
    key: 'general',
    title: 'General',
    permissions: [
      {
        key: PermissionType.ADD_CLIENT,
        name: 'Add client',
        description: 'The ability to add and edit clients.',
        approvedRoles: approvedRoles.ADD_CLIENT,
      },
      {
        key: PermissionType.DELETE_CLIENT,
        name: 'Delete client',
        description: 'The ability to delete clients.',
        approvedRoles: approvedRoles.DELETE_CLIENT,
      },
      {
        key: PermissionType.ADD_INVOLVEMENT,
        name: 'Add involvement',
        description: 'The ability to add, edit and delete involvements.',
        approvedRoles: approvedRoles.ADD_INVOLVEMENT,
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
        approvedRoles: approvedRoles.ACCESS_ROLE,
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
        approvedRoles: approvedRoles.EDIT_BILLING_DETAILS,
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
        approvedRoles: approvedRoles.ONGOING_MONITORING,
      },
      {
        key: PermissionType.ADD_HIT,
        name: 'Add hit',
        description: 'The ability to add and edit hits.',
        approvedRoles: approvedRoles.ADD_HIT,
      },
      {
        key: PermissionType.REMOVE_HIT,
        name: 'Remove hit',
        description: 'The ability to delete hits.',
        approvedRoles: approvedRoles.REMOVE_HIT,
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
        approvedRoles: approvedRoles.ADD_FIELD,
      },
      {
        key: PermissionType.CUSTOMER_RISK_ASSESSMENT,
        name: 'Customer risk assessment ',
        description: 'The ability to access the risk assessment settings.',
        approvedRoles: approvedRoles.CUSTOMER_RISK_ASSESSMENT,
      },
      {
        key: PermissionType.JURISDICTIONAL_RISK_ASSESSMENT,
        name: 'Jurisdictional risk assessment',
        description:
          'The ability to view and edit the jurisdictional risk assessment.',
        approvedRoles: approvedRoles.JURISDICTIONAL_RISK_ASSESSMENT,
      },
    ],
  },
];

export { roles, permissionsFields };
