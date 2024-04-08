import { PermissionsCategory, PermissionType } from './types/types';
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

export { getPermissionsForInheritedRole, toCamelCase, customToast };
