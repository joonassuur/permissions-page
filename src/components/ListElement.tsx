interface Props {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
}

function ListElement({ title, onClick, icon }: Props) {
  return (
    <li
      className="hover:bg-black-3 rounded-md text-secondary hover:text-primary"
      onClick={onClick}
    >
      <a href="#" className="flex items-center p-4 text-md">
        {icon}
        <span className="ms-3">{title}</span>
      </a>
    </li>
  );
}

export default ListElement;
