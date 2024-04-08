import ModalContainer from './ModalContainer';
import Button from '../buttons/Button';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteTitle: string;
  onSubmit: () => void;
}

function DeleteConfirmModal({ open, setOpen, onSubmit, deleteTitle }: Props) {
  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      title={`Remove ${deleteTitle}?`}
    >
      <form onSubmit={onSubmit}>
        <div className="flex justify-between mt-10">
          <Button
            variant="secondary"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
          <Button type="submit" variant="primary" title="Remove" />
        </div>
      </form>
    </ModalContainer>
  );
}

export default DeleteConfirmModal;
