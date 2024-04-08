interface Props {
  title: string;
  variant: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  onClick?: () => void;
}
function Button({ title, onClick, variant, type }: Props) {
  return (
    <button
      type={type || 'button'}
      aria-label={title}
      className={`${
        variant === 'primary' ? 'text-primary' : 'text-secondary'
      } focus:ring-2 focus:ring-purple-4 font-lg rounded-lg py-3 ${
        variant === 'primary' ? 'bg-purple-1' : 'bg-black-7'
      } focus:outline-none text-base flex items-center w-44 justify-center`}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {title}
    </button>
  );
}

export default Button;
