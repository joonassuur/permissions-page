import IconButton from './buttons/IconButton';
import MainHeader2 from './headers/MainHeader2';
import { PlusIcon } from '../assets/icons/PlusIcon';

interface Props {
  title: string;
  onButtonClick: () => void;
}

function PageHeader({ title, onButtonClick }: Props) {
  return (
    <div className="flex justify-between items-center">
      <MainHeader2 title={title} />
      <IconButton
        icon={<PlusIcon />}
        title="New role"
        onClick={onButtonClick}
      />
    </div>
  );
}

export default PageHeader;
