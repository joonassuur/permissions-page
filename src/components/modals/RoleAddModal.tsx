import { useState, useEffect } from 'react';
import InputField from '../formElements/InputField';
import SelectField from '../formElements/SelectField';
import { Role, AddRolePayload } from '../../types/types';
import ModalContainer from './ModalContainer';
import { customToast } from '../../utils';
import { useAppSelector } from '../../redux/reduxHooks';
import Button from '../buttons/Button';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: ({ roleName, roleInherit }: AddRolePayload) => void;
}

function RoleAddModal({ open, setOpen, onSubmit }: Props) {
  const [roleName, setRoleName] = useState('');
  const [roleInherit, setRoleInherit] = useState('');
  const roles: Role[] = useAppSelector((state) => state.data.roles);

  const handleSubmit = () => {
    if (
      roles.some(
        (role: Role) => role.name.toLowerCase() === roleName.toLowerCase()
      )
    ) {
      customToast('Role already exists');
      return;
    }

    if (!roleName) return;
    onSubmit({
      roleName,
      roleInherit,
    });
  };

  useEffect(() => {
    setRoleName('');
    setRoleInherit('');
  }, [open]);

  return (
    <ModalContainer open={open} setOpen={setOpen} title="Create new role">
      <form>
        <div>
          <InputField
            isFocused
            label="Role name"
            value={roleName}
            required
            onChange={setRoleName}
          />
          <SelectField
            label="Exisiting roles to inherit permissions from"
            value={roleInherit}
            options={roles.map((role) => ({
              key: role.key,
              value: role.name,
            }))}
            onChange={(value) => setRoleInherit(value)}
          />
        </div>
        <div className="flex justify-between mt-10">
          <Button
            variant="secondary"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
          <Button
            type="button"
            onClick={handleSubmit}
            variant="primary"
            title="Create role"
          />
        </div>
      </form>
    </ModalContainer>
  );
}

export default RoleAddModal;
