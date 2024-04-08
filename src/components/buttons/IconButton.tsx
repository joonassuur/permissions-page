interface Props {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
}
function IconButton({ title, onClick, icon }: Props) {
  return (
    <button
      type="button"
      aria-label={title}
      className="text-purple-1 focus:ring-2 focus:ring-purple-4 font-medium rounded-lg px-6 py-3 bg-purple-2 focus:outline-none text-lg flex items-center"
      onClick={onClick}
    >
      <i className="mr-2">{icon}</i>
      {title}
    </button>
  );
}

export default IconButton;
