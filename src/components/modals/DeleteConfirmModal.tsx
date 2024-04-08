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
      <form>
        <div className="flex justify-between">
          <Button
            variant="secondary"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
          <Button
            type="button"
            onClick={onSubmit}
            variant="primary"
            title="Remove"
          />
        </div>
      </form>
    </ModalContainer>
  );
}

export default DeleteConfirmModal;
