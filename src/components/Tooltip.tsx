interface Props {
  text: string;
  x: number;
  y: number;
}

function Tooltip({ text, x, y }: Props) {
  return (
    <div
      className="absolute z-10 max-w-40"
      style={{
        left: `${x}px`,
        top: `${y - 50}px`,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="-mt-8 -ml-4 p-2.5  text-secondary text-base rounded-lg  transition-opacity duration-300 bg-black-4 border border-border">
        <p className="text-white text-center text-base">{text}</p>
      </div>
    </div>
  );
}

export default Tooltip;
