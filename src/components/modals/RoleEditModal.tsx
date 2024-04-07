import { useState, useEffect } from 'react';
import InputField from '../formElements/InputField';
import { Role } from '../../types/types';
import ModalContainer from './ModalContainer';
import Button from '../buttons/Button';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRole: Role | null;
  onSubmit: (role: Role) => void;
}

function RoleEditModal({ open, setOpen, onSubmit, selectedRole }: Props) {
  const [newRole, setNewRole] = useState<Role | null>(selectedRole);

  useEffect(() => {
    return () => {
      setNewRole(selectedRole);
    };
  }, [open, selectedRole]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newRole?.name) return;
    onSubmit(newRole);
    setOpen(false);
  };

  const handleRoleNameChange = (value: string) => {
    if (!newRole) return;
    setNewRole({ ...newRole, name: value });
  };

  return (
    <ModalContainer open={open} setOpen={setOpen} title="Edit">
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
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
          <Button type="submit" variant="primary" title="Save" />
        </div>
      </form>
    </ModalContainer>
  );
}

export default RoleEditModal;
