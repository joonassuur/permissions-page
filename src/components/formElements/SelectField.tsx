interface Props {
  label: string;
  options: { key: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}
function SelectField({ label, options, value, onChange }: Props) {
  return (
    <div className="mb-3">
      <label htmlFor={label} className="block mb-2 text-lg text-secondary">
        {label}
      </label>
      <div className="select relative">
        <select
          aria-label={label}
          id={label}
          className="appearance-none bg-black-7 text-primary text-lg rounded-md focus:ring-2 focus:ring-purple-4 block w-full p-3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">None</option>
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectField;
