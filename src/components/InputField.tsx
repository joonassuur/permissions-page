interface Props {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
  required?: boolean;
}
function InputField({
  label,
  required,
  value,
  placeholder,
  type,
  onChange,
}: Props) {
  return (
    <div className="mb-3">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-secondary"
      >
        {label}
      </label>
      <input
        required={required}
        type={type || 'text'}
        value={value || ''}
        className="bg-black-7 text-sm rounded-md focus:ring-2 focus:ring-purple-4 block w-full p-3 text-primary"
        placeholder={placeholder || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default InputField;
