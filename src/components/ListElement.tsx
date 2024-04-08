import { Link } from 'react-router-dom';

interface Props {
  title: string;
  onClick?: () => void;
  icon: React.ReactNode;
  textColor?: string;
  borderBottom?: boolean;
  route?: string;
  active?: boolean;
}
interface ListElementContentProps {
  icon: React.ReactNode;
  title: string;
  largeFont?: boolean;
}

const ListElementContent = ({
  icon,
  title,
  largeFont,
}: ListElementContentProps) => {
  return (
    <>
      {icon}
      <span className={`ms-3 ${largeFont ? 'text-lg' : 'text-base'}`}>
        {title}
      </span>
    </>
  );
};

function ListElement({
  title,
  onClick,
  textColor,
  icon,
  borderBottom,
  route,
  active,
}: Props) {
  return (
    <li
      className={`hover:bg-black-3 ${
        active ? 'bg-black-3' : 'bg-transparent'
      } font-normal rounded-md ${
        textColor || 'text-secondary'
      } hover:text-primary ${borderBottom ? 'border-b border-border' : ''}`}
      onClick={onClick}
    >
      {route ? (
        <Link to={route} className="flex items-center p-4">
          <ListElementContent icon={icon} title={title} />
        </Link>
      ) : (
        <span className="flex items-center p-4 cursor-pointer">
          <ListElementContent largeFont icon={icon} title={title} />
        </span>
      )}
    </li>
  );
}

export default ListElement;
