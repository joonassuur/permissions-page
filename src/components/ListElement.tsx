import { Link } from 'react-router-dom';

interface Props {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
  textColor?: string;
  borderBottom?: boolean;
  route?: string;
}
interface ListElementContentProps {
  icon: React.ReactNode;
  title: string;
}

const ListElementContent = ({ icon, title }: ListElementContentProps) => {
  return (
    <>
      {icon}
      <span className="ms-3">{title}</span>
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
}: Props) {
  return (
    <li
      className={`hover:bg-black-3 rounded-md ${
        textColor || 'text-secondary'
      } hover:text-primary ${borderBottom ? 'border-b border-border' : ''}`}
      onClick={onClick}
    >
      {route ? (
        <Link to={route} className="flex items-center p-4 text-md">
          <ListElementContent icon={icon} title={title} />
        </Link>
      ) : (
        <span className="flex items-center p-4 text-md cursor-pointer">
          <ListElementContent icon={icon} title={title} />
        </span>
      )}
    </li>
  );
}

export default ListElement;
