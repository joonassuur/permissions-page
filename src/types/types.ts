interface MenuItem {
  text: string;
  icon: any;
  key: string;
}

enum PermissionType {
  ADD_CLIENT = 'ADD_CLIENT',
  DELETE_CLIENT = 'DELETE_CLIENT',
  ADD_INVOLVEMENT = 'ADD_INVOLVEMENT',
  ACCESS_ROLE = 'ACCESS_ROLE',
  EDIT_BILLING_DETAILS = 'EDIT_BILLING_DETAILS',
  ONGOING_MONITORING = 'ONGOING_MONITORING',
  ADD_HIT = 'ADD_HIT',
  REMOVE_HIT = 'REMOVE_HIT',
  ADD_FIELD = 'ADD_FIELD',
  CUSTOMER_RISK_ASSESSMENT = 'CUSTOMER_RISK_ASSESSMENT',
  JURISDICTIONAL_RISK_ASSESSMENT = 'JURISDICTIONAL_RISK_ASSESSMENT',
}

interface Role {
  key: string;
  name: string;
}

interface Permissions {
  key: PermissionType;
  name: string;
  description: string;
  approvedRoles: Role[];
}

interface PermissionsCategory {
  key: string;
  title: string;
  permissions: Permissions[];
}

interface AddRolePayload {
  roleName: string;
  roleInherit: string;
}

export { PermissionType };
export type {
  MenuItem,
  Role,
  PermissionsCategory,
  Permissions,
  AddRolePayload,
};
