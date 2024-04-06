interface Props {
  checked: boolean;
  handleChange: () => void;
  disabled?: boolean;
}

function Toggle({ checked, handleChange, disabled }: Props) {
  return (
    <label
      className={`inline-flex items-center ${
        !disabled ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div
        className={`relative w-11 h-6 bg-black-6 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full ${
          !disabled
            ? 'peer-checked:after:border-purple-4'
            : 'peer-checked:after:border-purple-6'
        } after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary ${
          !disabled
            ? 'peer-checked:after:bg-purple-4'
            : 'peer-checked:after:bg-purple-6'
        }  after:border-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
          !disabled ? 'peer-checked:bg-purple-3' : 'peer-checked:bg-purple-5'
        }`}
      />
    </label>
  );
}

export default Toggle;
