import { PermissionsCategory, PermissionType, MenuItem } from './types/types';
import { LockIcon } from './assets/icons/LockIcon';
import { FlagIcon } from './assets/icons/FlagIcon';
import { MeterIcon } from './assets/icons/MeterIcon';
import { DocsIcon } from './assets/icons/DocsIcon';
import { BillingIcon } from './assets/icons/BillingIcon';
import { ListIcon } from './assets/icons/ListIcon';
import Permissions from './views/Permissions';
import { MembersIcon } from './assets/icons/MembersIcon';
import { toast } from 'react-toastify';

const getPermissionsForInheritedRole = (
  permissions: PermissionsCategory[],
  roleInherit: string
): PermissionType[] => {
  const memberRolePermissions: PermissionType[] = [];

  permissions.forEach((category) => {
    category.permissions.forEach((permission) => {
      const isApproved = permission.approvedRoles.some(
        (role) => role.key === roleInherit
      );
      if (isApproved) {
        memberRolePermissions.push(permission.key as PermissionType);
      }
    });
  });

  return memberRolePermissions;
};

function toCamelCase(input: string) {
  const words = input.replace(/[^a-zA-Z0-9]/g, ' ').split(' ');
  const camelCaseWords = words.map((word, index) =>
    index === 0
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const camelCaseString = camelCaseWords.join('');
  return camelCaseString;
}

const toastStyles = {
  background: '#131b24',
  color: '#677B92',
};

const customToast = (text: string) => {
  toast(text, { style: toastStyles });
};

const menuItems: MenuItem[] = [
  {
    text: 'Members',
    key: 'members',
    icon: <MembersIcon />,
    element: <div />,
  },
  {
    text: 'Billing',
    key: 'billing',
    icon: <BillingIcon />,
    element: <div />,
  },
  {
    text: 'Questionnaires',
    key: 'questionnaires',
    icon: <ListIcon />,
    element: <div />,
  },
  {
    text: 'Docs',
    key: 'docs',
    icon: <DocsIcon />,
    element: <div />,
  },
  {
    text: 'Jurisdictional risk',
    key: 'jurisdictionalRisk',
    icon: <FlagIcon />,
    element: <div />,
  },
  {
    text: 'Risk assessments',
    key: 'riskAssessments',
    icon: <MeterIcon />,
    element: <div />,
  },
  {
    text: 'Permissions',
    key: 'permissions',
    icon: <LockIcon />,
    element: <Permissions />,
  },
];

export { getPermissionsForInheritedRole, toCamelCase, customToast, menuItems };
