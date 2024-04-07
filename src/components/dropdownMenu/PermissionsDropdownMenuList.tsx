import ListElement from '../ListElement';
import { BinIcon } from '../../assets/icons/BinIcon';
import { PencilIcon } from '../../assets/icons/PencilIcon';

interface Props {
  onEditClick: () => void;
  onRemove: () => void;
}

function PermissionsDropdownMenuList({ onEditClick, onRemove }: Props) {
  return (
    <ul
      className="text-sm text-gray-700"
      aria-labelledby="dropdownMenuIconButton"
    >
      <ListElement
        textColor="text-primary"
        title="Edit details"
        borderBottom
        icon={<PencilIcon />}
        onClick={onEditClick}
      />
      <ListElement
        textColor="text-red-1"
        title="Remove"
        icon={<BinIcon />}
        onClick={onRemove}
      />
    </ul>
  );
}

export default PermissionsDropdownMenuList;
