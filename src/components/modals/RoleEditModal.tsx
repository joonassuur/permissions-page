import { useState, useEffect } from 'react';
import InputField from '../formElements/InputField';
import { Role } from '../../types/types';
import ModalContainer from './ModalContainer';
import { customToast } from '../../utils';
import { useAppSelector } from '../../redux/reduxHooks';
import Button from '../buttons/Button';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRole: Role | null;
  onSubmit: (role: Role) => void;
}

function RoleEditModal({ open, setOpen, onSubmit, selectedRole }: Props) {
  const [newRole, setNewRole] = useState<Role | null>(selectedRole);
  const roles: Role[] = useAppSelector((state) => state.data.roles);

  useEffect(() => {
    return () => {
      setNewRole(selectedRole);
    };
  }, [open, selectedRole]);

  const handleSubmit = () => {
    if (!newRole?.name) {
      customToast('Role name is required');
      return;
    }

    if (
      roles.some(
        (role: Role) => role.name.toLowerCase() === newRole?.name.toLowerCase()
      )
    ) {
      customToast('Role already exists');
      return;
    }
    onSubmit(newRole);
  };

  const handleRoleNameChange = (value: string) => {
    if (!newRole) return;
    setNewRole({ ...newRole, name: value });
  };

  return (
    <ModalContainer open={open} setOpen={setOpen} title="Edit">
      <form>
        <div>
          <InputField
            isFocused
            label="Role name"
            value={newRole?.name || ''}
            required
            onChange={handleRoleNameChange}
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
            title="Save"
          />
        </div>
      </form>
    </ModalContainer>
  );
}

export default RoleEditModal;
